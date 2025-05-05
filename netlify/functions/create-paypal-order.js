// netlify/functions/create-paypal-order.js - Attempt to fix SDK import issue

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client (outside handler is fine)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
    // 1. Verify POST method
    if (event.httpMethod !== 'POST') {
         return { statusCode: 405, body: JSON.stringify({ error: 'Metodo non permesso' }), headers: { 'Content-Type': 'application/json' } };
    }

    // --- Initialize PayPal SDK INSIDE the handler ---
    let paypal;
    let paypalClient;
    try {
        paypal = require('@paypal/paypal-server-sdk'); // Try requiring inside
        const clientId = process.env.PAYPAL_CLIENT_ID;
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
        if (!clientId || !clientSecret) throw new Error("PayPal credentials missing in env");

        // Select environment based on Netlify context or default to Sandbox
        const environment = process.env.CONTEXT === 'production'
            ? new paypal.core.LiveEnvironment(clientId, clientSecret) // Usa paypal.core
            : new paypal.core.SandboxEnvironment(clientId, clientSecret); // Usa paypal.core

        paypalClient = new paypal.core.PayPalHttpClient(environment); // Usa paypal.core.PayPalHttpClient
        console.log("PayPal Client initialized inside handler.");

    } catch (sdkError) {
         console.error("FATAL: Failed to initialize PayPal SDK:", sdkError);
         // Mostra un messaggio di errore più dettagliato se possibile
         const errorMessage = sdkError.message || 'PayPal SDK initialization failed.';
         return { statusCode: 500, body: JSON.stringify({ error: `PayPal SDK initialization failed: ${errorMessage}` }), headers: { 'Content-Type': 'application/json' } };
    }
    // --- End PayPal SDK Initialization ---


    // 2. Verify User Auth (same logic as before)
    const user = context.clientContext?.user;
    let userId = user?.sub;
    if (!userId) { console.warn("User context not found."); /* Handle missing user */ }
    else { console.log("Request from User ID:", userId); }

    // 3. Extract lessonId (same logic as before)
    let lessonId;
    try {
         const body = JSON.parse(event.body);
         lessonId = body.lessonId;
         if (!lessonId) throw new Error('lessonId mancante');
    } catch (error) {
         console.error("Errore parsing body:", error);
         return { statusCode: 400, body: JSON.stringify({ error: 'Richiesta malformata' }), headers: { 'Content-Type': 'application/json' } };
    }

    console.log(`Requesting PayPal order (new SDK - handler init) for lessonId: ${lessonId}`);

    try {
        // 4. Get lesson details from Supabase (same logic as before)
        const { data: lesson, error: lessonError } = await supabase.from('video_lessons').select('name, price_eur').eq('id', lessonId).single();
        if (lessonError || !lesson) {
            console.error(`Errore recupero lezione ${lessonId}:`, lessonError);
            const statusCode = lessonError?.code === 'PGRST116' ? 404 : 500;
            return { statusCode, body: JSON.stringify({ error: 'Lezione non trovata o errore DB' }), headers: { 'Content-Type': 'application/json' } };
        }
        if (lesson.price_eur == null || isNaN(parseFloat(lesson.price_eur)) || parseFloat(lesson.price_eur) <= 0) {
             console.error(`Prezzo non valido per lezione ${lessonId}:`, lesson.price_eur);
             return { statusCode: 400, body: JSON.stringify({ error: 'Prezzo lezione non valido.' }), headers: { 'Content-Type': 'application/json' } };
        }
        const price = parseFloat(lesson.price_eur).toFixed(2);
        const lessonName = lesson.name || `Lezione ${lessonId}`;
        console.log(`Lesson details: Name='<span class="math-inline">\{lessonName\}', Price\=</span>{price} EUR`);


        // 5. Create PayPal order request payload (same logic as before)
        const requestPayload = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: { currency_code: 'EUR', value: price },
                description: lessonName,
                custom_id: `<span class="math-inline">\{lessonId\}</span>{userId ? ';' + userId : ''}`, // Include lessonId;userId
            }]
        };
        const request = { verb: 'POST', path: '/v2/checkout/orders', body: requestPayload, headers: { 'Content-Type': 'application/json' } };


        // 6. Execute request using the client initialized INSIDE the handler
        console.log("Executing PayPal order creation request (new SDK)...");
        const response = await paypalClient.execute(request); // Use paypalClient directly
        console.log("PayPal response (new SDK): Status=", response.statusCode);


        // 7. Extract orderId (same logic as before)
        const orderId = response.result?.id;
        if (!orderId || response.statusCode < 200 || response.statusCode >= 300) {
            console.error("Errore nella risposta da PayPal:", response.statusCode, response.result);
            throw new Error(`Creazione ordine PayPal fallita (${response.statusCode})`);
        }
        console.log(`PayPal order created (new SDK): ID=<span class="math-inline">\{orderId\}, Status\=</span>{response.result?.status}`);


        // 8. Return orderId (same logic as before)
        return { statusCode: 200, body: JSON.stringify({ orderId: orderId }), headers: { 'Content-Type': 'application/json' } };

    } catch (err) {
        console.error("ERROR during order creation or Supabase interaction (new SDK):", err);
        let errorMessage = err.message || 'Errore interno del server.';
        let errorStatusCode = 500;
        if (err.statusCode) { // PayPal SDK specific error
             console.error("PayPal SDK Error:", err.statusCode, err.message, err.result);
             errorMessage = `Errore PayPal (${err.statusCode}).`;
             errorStatusCode = err.statusCode;
        }
        return { statusCode: errorStatusCode, body: JSON.stringify({ error: errorMessage }), headers: { 'Content-Type': 'application/json' } };
    }
};