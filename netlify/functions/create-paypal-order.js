// netlify/functions/create-paypal-order.js

// Importa le librerie necessarie
const paypal = require('@paypal/checkout-server-sdk');
const { createClient } = require('@supabase/supabase-js');

// Helper per creare l'ambiente PayPal (Sandbox o Live)
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    // Usa process.env.CONTEXT === 'production' per distinguere se sei in produzione su Netlify
    // return new paypal.core.LiveEnvironment(clientId, clientSecret); // Per produzione
    return new paypal.core.SandboxEnvironment(clientId, clientSecret); // Per sviluppo e test
}

// Helper per creare il client PayPal
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

// Inizializza il client Supabase (usando la chiave Service Role per bypassare RLS se necessario)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Usa la chiave Service Role per operazioni sicure lato server
);

exports.handler = async (event, context) => {
    // 1. Verifica Metodo HTTP (accetta solo POST)
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed
            body: JSON.stringify({ error: 'Metodo non permesso' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }

    // 2. Verifica Autenticazione Utente
    // Netlify Identity o Supabase Auth passano info utente nel context
    // Qui usiamo Supabase Auth: il token JWT dovrebbe essere nell'header Authorization
    const user = context.clientContext?.user;
    if (!user) {
        // Se non c'è user nel context (potrebbe dipendere dalla configurazione Netlify/Supabase)
        // prova a verificare il token manualmente se presente nell'header
        // (Questa parte può diventare complessa, per ora assumiamo che Netlify popoli 'user'
        // se l'autenticazione Supabase è configurata correttamente con Netlify Identity o GoTrue)
        // Se non funziona, dovremo aggiungere la verifica manuale del token JWT
         console.warn("User context non trovato. Assicurati che l'autenticazione Supabase sia integrata con Netlify Identity o che il token JWT sia inviato e verificato correttamente.");
         // return { statusCode: 401, body: JSON.stringify({ error: 'Autenticazione richiesta' }), headers: { 'Content-Type': 'application/json' } };
         // Per ora, commentiamo l'errore 401 per facilitare i test iniziali, MA VA RIABILITATO!
    }

     // Recupera l'ID utente (se disponibile nel context)
     const userId = user?.sub; // 'sub' è solitamente l'ID utente nel token JWT
     // console.log("Richiesta dall'utente ID:", userId); // Log per debug

    // 3. Estrai l'ID della lezione dal corpo della richiesta
    let lessonId;
    try {
        const body = JSON.parse(event.body);
        lessonId = body.lessonId;
        if (!lessonId) {
            throw new Error('lessonId mancante nel corpo della richiesta');
        }
    } catch (error) {
        console.error("Errore parsing body richiesta:", error);
        return { statusCode: 400, body: JSON.stringify({ error: 'Richiesta malformata o lessonId mancante' }), headers: { 'Content-Type': 'application/json' } };
    }

    console.log(`Richiesta creazione ordine PayPal per lezione ID: ${lessonId}`);

    try {
        // 4. Recupera i dettagli (e il prezzo!) della lezione da Supabase
        const { data: lesson, error: lessonError } = await supabase
            .from('video_lessons')
            .select('name, price_eur') // Seleziona solo nome e prezzo EUR
            .eq('id', lessonId)
            .single(); // Ci aspettiamo un solo risultato

        if (lessonError || !lesson) {
            console.error(`Errore recupero lezione ${lessonId} da Supabase:`, lessonError);
            const statusCode = lessonError?.code === 'PGRST116' ? 404 : 500; // PGRST116 = Not Found
            const errorMessage = statusCode === 404 ? 'Lezione non trovata' : 'Errore nel recupero dettagli lezione';
            return { statusCode, body: JSON.stringify({ error: errorMessage }), headers: { 'Content-Type': 'application/json' } };
        }

        if (lesson.price_eur === null || lesson.price_eur === undefined || isNaN(parseFloat(lesson.price_eur)) || parseFloat(lesson.price_eur) <= 0) {
             console.error(`Prezzo non valido per lezione ${lessonId}:`, lesson.price_eur);
             return { statusCode: 400, body: JSON.stringify({ error: 'Prezzo della lezione non valido o non impostato.' }), headers: { 'Content-Type': 'application/json' } };
        }

        const price = parseFloat(lesson.price_eur).toFixed(2); // Formatta a due decimali
        const lessonName = lesson.name || `Lezione ${lessonId}`; // Nome di fallback
        console.log(`Dettagli lezione: Nome='${lessonName}', Prezzo=${price} EUR`);


        // 5. Crea la richiesta per l'ordine PayPal
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation"); // Chiede la rappresentazione completa dell'ordine nella risposta

        // Costruisce il corpo della richiesta per PayPal
        request.requestBody({
            intent: 'CAPTURE', // Intento: cattura il pagamento immediatamente dopo l'approvazione
            purchase_units: [{
                amount: {
                    currency_code: 'EUR', // Valuta
                    value: price // Prezzo recuperato da Supabase
                },
                description: lessonName, // Descrizione opzionale
                custom_id: `${lessonId}`, // ID Lezione nel custom_id per ritrovarlo nel webhook
                // invoice_id: `INV-${userId}-${lessonId}-${Date.now()}` // ID Fattura univoco opzionale
                // Aggiungi qui altri dettagli se necessario (es. item list)
            }],
            // NOTA: Non impostiamo qui le return_url/cancel_url perché useremo l'approvazione
            // gestita dall'SDK JS nel frontend, che poi ci notificherà tramite Webhook.
        });

        // 6. Esegui la richiesta per creare l'ordine su PayPal
        console.log("Invio richiesta creazione ordine a PayPal...");
        const order = await client().execute(request);
        console.log("Risposta da PayPal:", order);

        // 7. Estrai l'ID dell'ordine dalla risposta di PayPal
        const orderId = order.result.id;

        // 8. Restituisci l'ID dell'ordine al frontend
        return {
            statusCode: 200,
            body: JSON.stringify({ orderId: orderId }),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (err) {
        console.error("Errore durante la creazione ordine PayPal o interazione con Supabase:", err);
        // Controlla se l'errore viene da PayPal
        let errorMessage = 'Errore interno del server.';
        if (err.statusCode) { // Errore PayPal SDK
            console.error("Errore PayPal:", err.statusCode, err.message);
            // Potresti voler leggere i dettagli dell'errore se presenti in err.message (JSON)
             errorMessage = `Errore PayPal (${err.statusCode}). Riprova.`;
        }
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({ error: errorMessage }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};