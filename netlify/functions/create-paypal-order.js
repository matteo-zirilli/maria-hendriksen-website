// netlify/functions/create-paypal-order.js - VERSIONE CON @paypal/checkout-server-sdk (VECCHIO SDK)

const paypal = require('@paypal/checkout-server-sdk'); // VECCHIO SDK
const { createClient } = require('@supabase/supabase-js');

// Helper ambiente PayPal (VECCHIO SDK)
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    // return new paypal.core.LiveEnvironment(clientId, clientSecret); // Produzione
    return new paypal.core.SandboxEnvironment(clientId, clientSecret); // Test
}
// Helper client PayPal (VECCHIO SDK)
function client() { return new paypal.core.PayPalHttpClient(environment()); }

// Client Supabase
const supabase = createClient( process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY );

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') { /* ... return 405 ... */ }

    const user = context.clientContext?.user;
    let userId = user?.sub;
    if (!userId) { console.warn("User context mancante"); /* Gestire per produzione */ }

    let lessonId;
    try { /* ... Estrai lessonId ... */
        const body = JSON.parse(event.body);
        lessonId = body.lessonId;
        if (!lessonId) throw new Error('lessonId mancante');
    } catch (error) { /* ... return 400 ... */ }

    console.log(`Richiesta ordine (vecchio SDK) per lessonId: ${lessonId}`);

    try {
        // Recupera dettagli lezione
        const { data: lesson, error: lessonError } = await supabase.from('video_lessons').select('name, price_eur').eq('id', lessonId).single();
        if (lessonError || !lesson) { /* ... gestione errore Supabase ... */ }
        if (lesson.price_eur == null || isNaN(parseFloat(lesson.price_eur)) || parseFloat(lesson.price_eur) <= 0) { /* ... gestione prezzo non valido ... */ }
        const price = parseFloat(lesson.price_eur).toFixed(2);
        const lessonName = lesson.name || `Lezione ${lessonId}`;
		
		// --- AGGIUNGI QUESTI LOG PER DEBUG ---
		console.log(`[create-paypal-order] Verifying data before building request body:`);
		console.log(`  - lessonId: '${lessonId}' (Tipo: ${typeof lessonId})`);
		console.log(`  - userId: '${userId}' (Tipo: ${typeof userId})`);
		const final_custom_id = `<span class="math-inline">\{lessonId\}</span>{userId ? ';' + userId : ''}`;
		console.log(`  - Generated custom_id: '${final_custom_id}'`);
// --- FINE LOG AGGIUNTI ---

        // Crea richiesta ordine con VECCHIO SDK
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: { currency_code: 'EUR', value: price },
                description: lessonName,
                custom_id: `<span class="math-inline">\{lessonId\}</span>{userId ? ';' + userId : ''}`,
            }]
        });

        console.log("Invio richiesta creazione ordine (vecchio SDK)...");
        const order = await client().execute(request); // Usa client VECCHIO SDK
        console.log("Risposta PayPal (vecchio SDK): Status=", order.statusCode);

        const orderId = order.result?.id;
        if (!orderId || order.statusCode < 200 || order.statusCode >= 300) { throw new Error(`Creazione ordine fallita (${order.statusCode})`); }
        console.log(`Ordine creato (vecchio SDK): ID=<span class="math-inline">\{orderId\}, Status\=</span>{order.result?.status}`);

        return { statusCode: 200, body: JSON.stringify({ orderId: orderId }), headers: { 'Content-Type': 'application/json' } };

    } catch (err) { /* ... gestione errore uguale a prima ... */
        console.error("ERRORE in create-paypal-order (vecchio SDK):", err);
         let errMsg = err.message || 'Errore interno.'; let errCode = 500;
         if (err.statusCode) { errMsg = `Errore PayPal (${err.statusCode}).`; errCode = err.statusCode; }
         return { statusCode: errCode, body: JSON.stringify({ error: errMsg }), headers: { 'Content-Type': 'application/json' } };
    }
};