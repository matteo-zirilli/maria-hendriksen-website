// netlify/functions/create-mercadopago-preference.js
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ARG_ACCESS_TOKEN
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    try {
        // Autenticazione Utente
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) return { statusCode: 401, body: JSON.stringify({ error: 'Token non fornito.' }) };
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        const userId = decoded.sub;
        if (!userId) return { statusCode: 401, body: JSON.stringify({ error: 'ID utente non trovato.' }) };

        const { productCode, location, participants, lang } = JSON.parse(event.body);
        if (!productCode) return { statusCode: 400, body: JSON.stringify({ error: 'productCode mancante.' }) };

        const { data: service, error: serviceError } = await supabase
            .from('services')
            .select('name, name_en, name_es, price_ars, price_studio_ars, price_home_ars, price_per_person_ars')
            .eq('product_code', productCode)
            .single();

        if (serviceError || !service) throw new Error(`Servizio ${productCode} non trovato.`);

        let serviceTitle = service.name;
        if (lang === 'en' && service.name_en) serviceTitle = service.name_en;
        if (lang === 'es' && service.name_es) serviceTitle = service.name_es;

        let finalPriceARS = 0;
        if (service.price_per_person_ars && participants) {
            finalPriceARS = service.price_per_person_ars * participants;
        } else if (location && service.price_studio_ars && service.price_home_ars) {
            finalPriceARS = (location === 'studio') ? service.price_studio_ars : service.price_home_ars;
        } else if (service.price_ars) {
            finalPriceARS = service.price_ars;
        } else if (service.price_studio_ars) {
            finalPriceARS = service.price_studio_ars;
        } else {
            throw new Error("Prezzo in ARS non trovato.");
        }

        // --- INIZIO DELLA MODIFICA ---
        // Definiamo dinamicamente l'URL di successo
        let successUrl = `${process.env.URL}/piani.html?payment_status=mp_success`;
        if (productCode.startsWith('FISIO')) {
            successUrl = `${process.env.URL}/grazie-fisio.html`;
        }
        // --- FINE DELLA MODIFICA ---

        const preferenceBody = {
            items: [{
                id: productCode,
                title: serviceTitle,
                quantity: 1,
                currency_id: 'ARS',
                unit_price: parseFloat(finalPriceARS)
            }],
            back_urls: {
                success: successUrl, // <-- USA L'URL DINAMICO
                failure: `${process.env.URL}/piani.html?payment_status=mp_failure`,
                pending: `${process.env.URL}/piani.html?payment_status=mp_pending}`
            },
            auto_return: 'approved',
            external_reference: `${productCode};${userId}`,
            notification_url: `${process.env.URL}/.netlify/functions/mercadopago-webhook`
        };

        const preference = new Preference(client);
        const result = await preference.create({ body: preferenceBody });

        // Sostituisci la vecchia riga con questa

		return {
			statusCode: 200,
			body: JSON.stringify({
				init_point: result.init_point,
				preferenceId: result.id, // Includiamo anche il preferenceId, è una buona pratica
				publicKey: process.env.MERCADOPAGO_ARG_PUBLIC_KEY
			})
		};

    } catch (error) {
        console.error("ERRORE GRAVE in create-mercadopago-preference:", error);
        if (error.name === 'JsonWebTokenError') return { statusCode: 401, body: JSON.stringify({ error: 'Token non valido.' }) };
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};