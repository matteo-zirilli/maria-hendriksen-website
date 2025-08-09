// netlify/functions/create-mercadopago-preference.js
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const mercadopago = require('mercadopago');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Configura MercadoPago per l'Argentina
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ARG_ACCESS_TOKEN 
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // 1. Autenticazione Utente
    let userId;
    try {
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Token non fornito.');
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        userId = decoded.sub;
        if (!userId) throw new Error('ID utente non trovato nel token.');
    } catch (error) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Utente non autenticato.' }) };
    }

    try {
        const { productCode, location, participants } = JSON.parse(event.body);
        if (!productCode) {
            return { statusCode: 400, body: JSON.stringify({ error: 'productCode mancante.' }) };
        }

        // 2. Recupera il servizio dal database
        const { data: service, error: serviceError } = await supabase
            .from('services')
            .select('*')
            .eq('product_code', productCode)
            .single();

        if (serviceError || !service) {
            throw new Error(`Servizio con codice ${productCode} non trovato.`);
        }

        // 3. Calcola il prezzo finale IN PESOS ARGENTINI (ARS)
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
            throw new Error("Prezzo in ARS non trovato per questo servizio.");
        }

        // 4. Creazione della Preferenza di Pagamento
        const preference = {
            items: [{
                id: productCode,
                title: service.name,
                quantity: 1,
                currency_id: 'ARS', // Valuta argentina
                unit_price: parseFloat(finalPriceARS)
            }],
            back_urls: {
                success: `${process.env.URL}/piani.html?payment_status=mp_success`,
                failure: `${process.env.URL}/piani.html?payment_status=mp_failure`,
                pending: `${process.env.URL}/piani.html?payment_status=mp_pending}`
            },
            auto_return: 'approved',
            external_reference: `${productCode};${userId}`,
            notification_url: `${process.env.URL}/.netlify/functions/mercadopago-webhook`
        };

        const response = await mercadopago.preferences.create(preference);

        return {
            statusCode: 200,
            body: JSON.stringify({ init_point: response.body.init_point })
        };

    } catch (error) {
        console.error("ERRORE in create-mercadopago-preference:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};