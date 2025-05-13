// netlify/functions/mercadopago-webhook.js
const mercadopago = require('mercadopago');
const { createClient } = require('@supabase/supabase-js');

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configura MercadoPago (usa lo stesso Access Token della creazione preferenza)
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_SANDBOX_ACCESS_TOKEN
});

exports.handler = async (event, context) => {
    const invocationId = context.awsRequestId || `local-mp-${Date.now()}`;
    console.log(`[${invocationId}] MercadoPago Webhook Invocato`);

    if (event.httpMethod !== 'POST') {
        console.warn(`[${invocationId}] Metodo non consentito: ${event.httpMethod}`);
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const body = JSON.parse(event.body);
    console.log(`[${invocationId}] Body Webhook ricevuto:`, JSON.stringify(body, null, 2));

    // Tipo di notifica: IPN (Instant Payment Notification) o Webhook v2
    // Per Webhook v2, l'evento che ci interessa è solitamente 'payment'
    // Per IPN (più vecchio), potrebbe essere un topic 'payment' o 'merchant_order'
    const notificationType = body.type; // es. "payment"
    const eventAction = body.action; // es. "payment.updated", "payment.created"
    const paymentId = body.data?.id; // ID del pagamento

    if (notificationType === 'payment' && paymentId) {
        console.log(`[${invocationId}] Ricevuta notifica per pagamento ID: ${paymentId}, Azione: ${eventAction}`);

        try {
            // 1. Ottieni i dettagli del pagamento da MercadoPago
            // Questo serve anche come verifica che la notifica sia legittima,
            // perché stai usando il tuo access_token per ottenere i dati.
            console.log(`[${invocationId}] Richiesta dettagli pagamento ${paymentId} a MercadoPago...`);
            const paymentInfo = await mercadopago.payment.findById(paymentId);

            if (!paymentInfo || !paymentInfo.body) {
                console.error(`[${invocationId}] Impossibile recuperare informazioni per il pagamento ${paymentId} da MercadoPago.`);
                return { statusCode: 500, body: 'Failed to get payment info' };
            }

            const paymentDetails = paymentInfo.body;
            console.log(`[${invocationId}] Dettagli Pagamento da MP API:`, JSON.stringify(paymentDetails, null, 2));

            const status = paymentDetails.status; // es. "approved", "pending", "rejected"
            const externalReference = paymentDetails.external_reference; // "lessonId;userId"
            const orderIdFromMP = paymentDetails.id.toString(); // ID del pagamento da MP, come stringa

            // 2. Estrai lessonId e userId da external_reference
            let lessonId = null;
            let userId = null;
            if (externalReference && typeof externalReference === 'string') {
                const parts = externalReference.split(';');
                lessonId = parts[0];
                if (parts.length === 2 && parts[1]) {
                    userId = parts[1];
                }
                console.log(`[<span class="math-inline">\{invocationId\}\] Parsed external\_reference\: lessonId\='</span>{lessonId}', userId='${userId || 'N/A'}'`);
            } else {
                console.warn(`[${invocationId}] external_reference mancante o non è stringa nel pagamento ${orderIdFromMP}.`);
                // Potresti voler restituire 200 OK per dire a MP che hai ricevuto, ma loggare l'errore.
                return { statusCode: 200, body: JSON.stringify({ message: 'Webhook received, but external_reference missing.' })};
            }

            // 3. Processa solo se il pagamento è 'approved' e abbiamo i dati necessari
            if (status === 'approved' && lessonId) {
                console.log(`[${invocationId}] Pagamento ${orderIdFromMP} approvato per lessonId ${lessonId}. Controllo duplicati...`);

                // Controllo Idempotenza (evita doppi inserimenti)
                const { data: existingPurchase, error: checkError } = await supabase
                    .from('purchases')
                    .select('id')
                    .eq('payment_provider', 'mercadopago')
                    .eq('payment_id', orderIdFromMP) // Usa l'ID del pagamento di MercadoPago
                    .maybeSingle();

                if (checkError) {
                    console.error(`[${invocationId}] Errore Supabase controllo duplicati:`, JSON.stringify(checkError));
                    return { statusCode: 500, body: JSON.stringify({ error: 'DB check failed' }) };
                }

                if (existingPurchase) {
                    console.log(`[${invocationId}] Pagamento ${orderIdFromMP} GIA' PRESENTE (ID: ${existingPurchase.id}). Evento duplicato ignorato.`);
                    return { statusCode: 200, body: JSON.stringify({ message: 'Duplicate event ignored' }) };
                }

                // Inserimento nel Database
                console.log(`[${invocationId}] Pagamento ${orderIdFromMP} non presente. Inserimento in 'purchases'...`);
                const purchaseRecord = {
                    user_id: userId || null,
                    lesson_id: lessonId,
                    payment_provider: 'mercadopago',
                    payment_id: orderIdFromMP, // ID del pagamento da MercadoPago
                    status: 'completed', // Mappa 'approved' a 'completed'
                    amount: paymentDetails.transaction_amount ? parseFloat(paymentDetails.transaction_amount) : null,
                    currency: paymentDetails.currency_id || null,
                    payer_email: paymentDetails.payer?.email || null,
                    raw_payload: paymentDetails // Salva il payload completo da MP per debug
                };
                console.log(`[${invocationId}] Record da inserire:`, JSON.stringify(purchaseRecord));

                const { data: newPurchase, error: insertError } = await supabase
                    .from('purchases')
                    .insert([purchaseRecord])
                    .select();

                if (insertError) {
                    console.error(`[${invocationId}] Errore Supabase durante l'inserimento:`, JSON.stringify(insertError));
                    return { statusCode: 500, body: JSON.stringify({ error: 'DB save failed', details: insertError.message }) };
                }

                console.log(`[${invocationId}] === INSERIMENTO MERCADOPAGO SU SUPABASE RIUSCITO ===`);
                console.log(`[${invocationId}] Record inserito:`, JSON.stringify(newPurchase));

            } else if (status !== 'approved') {
                console.log(`[${invocationId}] Stato pagamento <span class="math-inline">\{orderIdFromMP\} è '</span>{status}', non 'approved'. Nessun inserimento in DB.`);
            } else {
                console.warn(`[${invocationId}] Dati evento incompleti (lessonId mancante) per pagamento approvato ${orderIdFromMP}.`);
            }

        } catch (error) {
            console.error(`[${invocationId}] Errore durante il processamento del webhook MercadoPago:`, error);
            const errorMessage = error.response?.data?.message || error.message || 'Errore interno.';
            return { statusCode: 500, body: JSON.stringify({ error: 'Webhook processing failed', details: errorMessage }) };
        }
    } else {
        console.log(`[<span class="math-inline">\{invocationId\}\] Tipo di notifica '</span>{notificationType}' o ID dati mancante. Evento ignorato.`);
    }

    // Rispondi 200 OK a MercadoPago per confermare la ricezione della notifica
    return { statusCode: 200, body: JSON.stringify({ message: 'Webhook received and processed or ignored' }) };
};