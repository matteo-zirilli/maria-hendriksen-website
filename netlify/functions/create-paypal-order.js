// netlify/functions/create-paypal-order.js - VERSIONE CON @paypal/paypal-server-sdk

// Importa le librerie necessarie
const paypal = require('@paypal/paypal-server-sdk'); // NUOVO SDK
const { createClient } = require('@supabase/supabase-js');

// Helper per creare l'ambiente PayPal (Sandbox o Live) - Leggermente diverso
function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.error("FATAL: PayPal Client ID or Secret not found in environment variables.");
        // In un caso reale, potresti voler lanciare un errore o gestire diversamente
    }

    // Usa process.env.CONTEXT === 'production' per distinguere se sei in produzione su Netlify
    // return new paypal.core.LiveEnvironment(clientId, clientSecret); // Per produzione
    return new paypal.core.SandboxEnvironment(clientId, clientSecret); // Per sviluppo e test
}

// Helper per creare il client PayPal - Uguale a prima
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

// Inizializza il client Supabase (uguale a prima)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
    // 1. Verifica Metodo HTTP (uguale a prima)
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Metodo non permesso' }), headers: { 'Content-Type': 'application/json' } };
    }

    // 2. Verifica Autenticazione Utente (uguale a prima - CON AVVERTENZA)
    const user = context.clientContext?.user;
     let userId = null;
     if (!user) {
          console.warn("User context non trovato. Autenticazione non verificata nel backend.");
          // QUI DOVREMMO RESTITUIRE 401 IN PRODUZIONE!
          // return { statusCode: 401, body: JSON.stringify({ error: 'Autenticazione richiesta' }), headers: { 'Content-Type': 'application/json' } };
     } else {
         userId = user.sub; // 'sub' è solitamente l'ID utente nel token JWT
         console.log("Richiesta dall'utente ID (dal context):", userId);
     }
     // Se userId è ancora null, l'ordine non includerà l'ID utente (problema per webhook)


    // 3. Estrai l'ID della lezione (uguale a prima)
    let lessonId;
    try {
        const body = JSON.parse(event.body);
        lessonId = body.lessonId;
        if (!lessonId) throw new Error('lessonId mancante');
    } catch (error) {
        console.error("Errore parsing body:", error);
        return { statusCode: 400, body: JSON.stringify({ error: 'Richiesta malformata o lessonId mancante' }), headers: { 'Content-Type': 'application/json' } };
    }

    console.log(`Richiesta creazione ordine PayPal (nuovo SDK) per lezione ID: ${lessonId}`);

    try {
        // 4. Recupera i dettagli lezione da Supabase (uguale a prima)
        const { data: lesson, error: lessonError } = await supabase
            .from('video_lessons')
            .select('name, price_eur')
            .eq('id', lessonId)
            .single();

        if (lessonError || !lesson) { /* ... gestione errore Supabase uguale a prima ... */
             console.error(`Errore recupero lezione ${lessonId}:`, lessonError);
             const statusCode = lessonError?.code === 'PGRST116' ? 404 : 500;
             const errorMessage = statusCode === 404 ? 'Lezione non trovata' : 'Errore recupero dettagli lezione';
             return { statusCode, body: JSON.stringify({ error: errorMessage }), headers: { 'Content-Type': 'application/json' } };
         }
         if (lesson.price_eur == null || isNaN(parseFloat(lesson.price_eur)) || parseFloat(lesson.price_eur) <= 0) {
             console.error(`Prezzo non valido per lezione ${lessonId}:`, lesson.price_eur);
             return { statusCode: 400, body: JSON.stringify({ error: 'Prezzo lezione non valido.' }), headers: { 'Content-Type': 'application/json' } };
         }

        const price = parseFloat(lesson.price_eur).toFixed(2);
        const lessonName = lesson.name || `Lezione ${lessonId}`;
        console.log(`Dettagli lezione: Nome='${lessonName}', Prezzo=${price} EUR`);

        // 5. Crea la richiesta ordine con il NUOVO SDK
        // Il nuovo SDK usa un approccio più diretto basato sulla API REST
        const requestPayload = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: price
                },
                description: lessonName,
                // Combiniamo lessonId e userId qui, se userId è disponibile
                custom_id: `${lessonId}${userId ? ';' + userId : ''}`,
            }]
        };

        // Crea l'oggetto richiesta per l'endpoint v2/checkout/orders
        const request = {
             verb: 'POST',
             path: '/v2/checkout/orders',
             body: requestPayload,
             headers: {
                 'Content-Type': 'application/json',
                 // 'PayPal-Request-Id': 'OPTIONAL_UNIQUE_ID' // Opzionale per idempotenza
                 // Potrebbe essere necessario aggiungere 'Prefer': 'return=representation' se non è default
             }
         };

        // 6. Esegui la richiesta usando il client del nuovo SDK
        console.log("Invio richiesta creazione ordine a PayPal (nuovo SDK)...");
        const response = await client().execute(request); // Usa execute generico
        console.log("Risposta da PayPal (nuovo SDK): Status=", response.statusCode);
        // console.log("Risposta completa PayPal:", JSON.stringify(response.result, null, 2)); // Log dettagliato opzionale

        // 7. Estrai l'ID ordine dalla risposta (la struttura è simile)
        const orderId = response.result?.id;
        const orderStatus = response.result?.status;

        if (!orderId || response.statusCode < 200 || response.statusCode >= 300) {
             console.error("Errore nella risposta da PayPal:", response.statusCode, response.result);
             throw new Error(`Creazione ordine PayPal fallita con stato ${response.statusCode}`);
        }
        console.log(`Ordine PayPal creato (nuovo SDK): ID=${orderId}, Status=${orderStatus}`);


        // 8. Restituisci l'ID ordine al frontend (uguale a prima)
        return {
            statusCode: 200, // Risposta OK al frontend
            body: JSON.stringify({ orderId: orderId }),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (err) {
        console.error("Errore durante creazione ordine PayPal o interazione Supabase (nuovo SDK):", err);
        let errorMessage = 'Errore interno del server.';
        let errorStatusCode = 500;
        if (err.statusCode) { // Errore specifico da PayPal SDK
             console.error("Errore PayPal SDK:", err.statusCode, err.message, err.result);
             errorMessage = `Errore PayPal (${err.statusCode}). Riprova.`;
             errorStatusCode = err.statusCode;
        } else if (err.message) {
             errorMessage = err.message;
        }
        return {
            statusCode: errorStatusCode,
            body: JSON.stringify({ error: errorMessage }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};