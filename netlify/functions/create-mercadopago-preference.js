// netlify/functions/create-mercadopago-preference.js
const mercadopago = require('mercadopago');
const { createClient } = require('@supabase/supabase-js');

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configura MercadoPago con le tue credenziali SANDBOX per ora
// Assicurati di averle impostate nelle variabili d'ambiente di Netlify
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_SANDBOX_ACCESS_TOKEN
    // Per produzione, userai MERCADOPAGO_ACCESS_TOKEN
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Content-Type': 'application/json' } };
    }

    // 1. Autenticazione Utente (opzionale ma consigliato per Netlify Functions protette)
    // Il tuo script.js invia già il token JWT di Supabase nell'header Authorization
    const clientContext = context.clientContext;
    if (!clientContext || !clientContext.user) {
        console.warn("Richiesta non autenticata o token mancante/invalido.");
        return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized: Missing or invalid token' }), headers: { 'Content-Type': 'application/json' }};
    }
    const userId = clientContext.user.sub; // ID utente da Supabase

    // 2. Estrazione Lesson ID
    let lessonId;
    try {
        const body = JSON.parse(event.body);
        lessonId = body.lessonId;
        if (!lessonId) {
            throw new Error('lessonId mancante nel corpo della richiesta');
        }
    } catch (error) {
        console.error("Errore parsing body o lessonId mancante:", error);
        return { statusCode: 400, body: JSON.stringify({ error: `Dati richiesta invalidi: ${error.message}` }), headers: { 'Content-Type': 'application/json' } };
    }

    console.log(`Richiesta preferenza MercadoPago per lessonId: ${lessonId} da userId: ${userId}`);

    try {
        // 3. Recupero dettagli lezione da Supabase
        const { data: lesson, error: lessonError } = await supabase
            .from('video_lessons')
            .select('name, price_eur, id') // Seleziona anche l'ID per passarlo come external_reference
            .eq('id', lessonId)
            .single();

        if (lessonError || !lesson) {
            console.error("Errore recupero lezione da Supabase o lezione non trovata:", lessonError);
            const dbErrorMessage = lessonError ? lessonError.message : 'Lezione non trovata.';
            return { statusCode: 404, body: JSON.stringify({ error: `Impossibile trovare la lezione: ${dbErrorMessage}` }), headers: { 'Content-Type': 'application/json' } };
        }

        if (lesson.price_eur == null || isNaN(parseFloat(lesson.price_eur)) || parseFloat(lesson.price_eur) <= 0) {
            console.error("Prezzo lezione non valido o mancante:", lesson.price_eur);
            return { statusCode: 400, body: JSON.stringify({ error: 'Prezzo della lezione non valido.' }), headers: { 'Content-Type': 'application/json' } };
        }
        const price = parseFloat(lesson.price_eur);
        const lessonName = lesson.name || `Lezione Video ID: ${lessonId}`;

        // 4. Creazione della Preferenza di Pagamento MercadoPago
        const preference = {
            items: [
                {
                    id: lesson.id.toString(), // ID della lezione, convertito a stringa
                    title: lessonName,
                    description: `Accesso alla video lezione: ${lessonName}`,
                    quantity: 1,
                    currency_id: 'EUR', // Assicurati che sia la valuta corretta e supportata dal tuo account MP
                    unit_price: price
                }
            ],
            payer: { // Puoi precompilare dati utente se li hai (es. email da clientContext.user.email)
                // email: clientContext.user.email, // Esempio
            },
            back_urls: {
                success: `<span class="math-inline">\{process\.env\.URL\}/contenuti\.html?payment\_status\=mp\_success&lesson\_id\=</span>{lessonId}`, // URL a cui tornare dopo successo
                failure: `<span class="math-inline">\{process\.env\.URL\}/contenuti\.html?payment\_status\=mp\_failure&lesson\_id\=</span>{lessonId}`, // URL per fallimento
                pending: `<span class="math-inline">\{process\.env\.URL\}/contenuti\.html?payment\_status\=mp\_pending&lesson\_id\=</span>{lessonId}`  // URL per pagamento pendente
            },
            auto_return: 'approved', // Torna automaticamente al sito solo se il pagamento è approvato
            external_reference: `<span class="math-inline">\{lessonId\};</span>{userId}`, // IMPORTANTE: Invia lessonId e userId per identificarli nel webhook
            notification_url: `${process.env.URL}/.netlify/functions/mercadopago-webhook` // URL del tuo webhook
            // Se il tuo URL base (process.env.URL) è quello di Netlify (es. tuosito.netlify.app), è corretto.
            // Altrimenti, se usi un custom domain, assicurati che process.env.URL rifletta quello.
        };

        console.log("Creazione preferenza MercadoPago con i seguenti dati:", JSON.stringify(preference, null, 2));

        const response = await mercadopago.preferences.create(preference);

        console.log("Risposta da MercadoPago per creazione preferenza:", JSON.stringify(response.body, null, 2));

        const preferenceId = response.body.id;
        const checkoutUrl = response.body.init_point; // URL per il redirect al checkout
        // const sandboxCheckoutUrl = response.body.sandbox_init_point; // URL per test in sandbox

        if (!checkoutUrl) {
            console.error("Errore: init_point (URL checkout) non presente nella risposta di MercadoPago.");
            throw new Error('URL di checkout non generato da MercadoPago.');
        }

        console.log(`Preferenza MercadoPago creata: ID=<span class="math-inline">\{preferenceId\}, Checkout URL\=</span>{checkoutUrl}`);

        return {
            statusCode: 200,
            body: JSON.stringify({
                preferenceId: preferenceId,
                init_point: checkoutUrl // Usa questo per il redirect
                // sandbox_init_point: sandboxCheckoutUrl // Potresti volerlo restituire per test specifici
            }),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (error) {
        console.error("ERRORE in create-mercadopago-preference:", error);
        // Controlla se l'errore viene da MercadoPago (spesso hanno una struttura specifica)
        const errorMessage = error.response?.data?.message || error.message || 'Errore interno durante la creazione della preferenza.';
        const errorCause = error.response?.data?.cause || [];
        console.error("Causa Errore MercadoPago:", JSON.stringify(errorCause, null, 2));
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({ error: errorMessage, cause: errorCause }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};