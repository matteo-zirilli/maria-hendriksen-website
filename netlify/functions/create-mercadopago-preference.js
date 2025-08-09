// netlify/functions/create-mercadopago-preference.js
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const mercadopago = require('mercadopago');

// Le inizializzazioni rimangono fuori, è corretto
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ARG_ACCESS_TOKEN 
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // --- INIZIO BLOCCO TRY...CATCH UNICO E PIÙ SICURO ---
    try {
        // 1. Autenticazione Utente
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Questo è un errore del client, non del server, quindi restituiamo 401
            return { statusCode: 401, body: JSON.stringify({ error: 'Token non fornito o malformato.' }) };
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        const userId = decoded.sub;
        if (!userId) {
            return { statusCode: 401, body: JSON.stringify({ error: 'ID utente non trovato nel token.' }) };
        }

        // 2. Estrazione e Validazione dei Dati
        const { productCode, location, participants } = JSON.parse(event.body);
        if (!productCode) {
            return { statusCode: 400, body: JSON.stringify({ error: 'productCode mancante.' }) };
        }

        // 3. Recupero del Servizio dal Database
        const { data: service, error: serviceError } = await supabase
            .from('services')
            .select('*')
            .eq('product_code', productCode)
            .single();

        if (serviceError || !service) {
            throw new Error(`Servizio con codice ${productCode} non trovato.`);
        }

        // 4. Calcolo del Prezzo Finale in Pesos Argentini (ARS)
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

        // 5. Creazione della Preferenza di Pagamento
        const preference = {
            items: [{
                id: productCode,
                title: service.name,
                quantity: 1,
                currency_id: 'ARS',
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
        
        // 6. Successo: Restituisci il link di checkout
        return {
            statusCode: 200,
            body: JSON.stringify({ init_point: response.body.init_point })
        };

    } catch (error) {
        // --- CATTURA QUALSIASI ERRORE ACCADUTO NEL BLOCCO TRY ---
        console.error("ERRORE GRAVE in create-mercadopago-preference:", error);
        
        // Controlla se l'errore è di autenticazione JWT per restituire un 401
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
             return { statusCode: 401, body: JSON.stringify({ error: 'Token non valido o scaduto.' }) };
        }
        
        // Per tutti gli altri errori, restituisci un 500 con un messaggio chiaro
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};