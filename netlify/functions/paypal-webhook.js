// netlify/functions/paypal-webhook.js

const paypal = require('@paypal/checkout-server-sdk');
const { createClient } = require('@supabase/supabase-js');

// Helper per ambiente PayPal (identico a create-paypal-order)
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    // return new paypal.core.LiveEnvironment(clientId, clientSecret); // Per produzione
    return new paypal.core.SandboxEnvironment(clientId, clientSecret); // Per sviluppo/test
}

// Helper per client PayPal (identico a create-paypal-order)
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

// Inizializza client Supabase (con chiave Service Role)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
    console.log("PayPal Webhook Received!");

    // 1. Verifica che la richiesta provenga da PayPal (FONDAMENTALE!)
    const headers = event.headers;
    const webhookId = process.env.PAYPAL_WEBHOOK_ID; // ID del webhook creato nel portale PayPal

    if (!webhookId) {
         console.error("PAYPAL_WEBHOOK_ID non impostato nelle variabili d'ambiente!");
         return { statusCode: 500, body: 'Internal Server Error: Webhook ID missing' };
    }

    const request = new paypal.webhooks.WebhooksVerifySignatureRequest();
    request.webhookId(webhookId);
    request.transmissionId(headers['paypal-transmission-id']);
    request.transmissionTime(headers['paypal-transmission-time']);
    request.transmissionSig(headers['paypal-transmission-sig']);
    request.authAlgo(headers['paypal-auth-algo']);
    request.certUrl(headers['paypal-cert-url']);
    request.requestBody(JSON.parse(event.body)); // Il corpo del webhook va passato per la verifica

    try {
        console.log("Verifying PayPal Webhook Signature...");
        const verification = await client().execute(request);
        console.log("Verification result:", verification.result);

        // Se la verifica fallisce, rifiuta la richiesta
        if (verification.result.verification_status !== 'SUCCESS') {
            console.warn('Webhook Verification Failed:', verification.result);
            return { statusCode: 401, body: 'Verification failed' };
        }
        console.log("Webhook Signature Verified Successfully.");

        // 2. Estrai e Processa l'Evento Verificato
        const webhookEvent = JSON.parse(event.body);

        // Controlla il tipo di evento che ci interessa
        if (webhookEvent.event_type === 'CHECKOUT.ORDER.APPROVED') {
            console.log("Processing CHECKOUT.ORDER.APPROVED event...");

            const orderId = webhookEvent.resource.id;
            const status = webhookEvent.resource.status; // Dovrebbe essere APPROVED
            // Recuperiamo lessonId e userId dal custom_id che abbiamo impostato
            let lessonId = null;
            let userId = null;
            if (webhookEvent.resource.purchase_units && webhookEvent.resource.purchase_units.length > 0) {
                const customData = webhookEvent.resource.purchase_units[0].custom_id; // Es: "lessonId;userId"
                if (customData) {
                     const parts = customData.split(';'); // Splitta la stringa
                     if(parts.length === 2){
                         lessonId = parts[0];
                         userId = parts[1];
                         console.log(`Extracted from custom_id: lessonId=${lessonId}, userId=${userId}`);
                     } else {
                         console.warn("custom_id non ha il formato atteso:", customData);
                     }
                } else {
                     console.warn("custom_id non presente nel purchase_unit.");
                }
            } else {
                console.warn("Nessun purchase_unit trovato nell'evento.");
            }


            // Verifica che abbiamo tutti i dati necessari
            if (orderId && status === 'APPROVED' && lessonId && userId) {

                 // --- Idempotency Check (Opzionale ma consigliato) ---
                 // Controlla se abbiamo già registrato questo ordine PayPal per evitare duplicati
                 const { data: existingPurchase, error: checkError } = await supabase
                     .from('purchases')
                     .select('id')
                     .eq('payment_provider', 'paypal')
                     .eq('payment_id', orderId)
                     .maybeSingle(); // Controlla se esiste già

                 if (checkError) {
                     console.error("Errore controllo acquisto esistente:", checkError);
                     // Non bloccare PayPal per questo, ma logga l'errore
                 }

                 if (existingPurchase) {
                     console.log(`Ordine PayPal ${orderId} già processato. Ignoro duplicato.`);
                     // Rispondi 200 OK a PayPal per evitare che riprovi
                     return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Duplicate ignored' }) };
                 }
                 // --- Fine Idempotency Check ---


                // 3. Inserisci il record dell'acquisto nel database Supabase
                console.log(`Inserimento acquisto in Supabase: User ${userId}, Lesson ${lessonId}, Order ${orderId}`);
                const { data, error: insertError } = await supabase
                    .from('purchases')
                    .insert([
                        {
                            user_id: userId,
                            lesson_id: lessonId,
                            payment_provider: 'paypal',
                            payment_id: orderId, // Salva l'ID ordine PayPal
                            status: 'completed' // Marca come completato
                        }
                    ])
                    .select(); // Opzionale: ritorna il record inserito

                if (insertError) {
                    console.error('Errore inserimento acquisto in Supabase:', insertError);
                    // Anche se c'è un errore DB, rispondiamo 200 a PayPal per evitare che ritenti all'infinito,
                    // ma dobbiamo loggare l'errore per investigare manualmente.
                    // In scenari critici, potresti voler rispondere 500 la prima volta per forzare un retry.
                    return { statusCode: 200, body: JSON.stringify({ received: true, error: 'Failed to save purchase to DB' }) };
                }

                console.log('Acquisto registrato con successo in Supabase:', data);

            } else {
                console.warn("Dati mancanti o stato non 'APPROVED' nell'evento:", webhookEvent.resource);
            }
        } else {
             console.log(`Evento ignorato: ${webhookEvent.event_type}`);
        }

        // 4. Rispondi a PayPal che abbiamo ricevuto l'evento con successo
        return {
            statusCode: 200, // Rispondi SEMPRE 200 OK a PayPal se hai ricevuto e verificato l'evento, anche se hai avuto problemi dopo
            body: JSON.stringify({ received: true })
        };

    } catch (err) {
        console.error('Errore durante la verifica o processamento del webhook:', err);
         // Se l'errore è nella verifica, potresti rispondere 400 o 401.
         // Se è dopo la verifica, idealmente rispondi 200 e logga l'errore.
        return {
            statusCode: (err.message && err.message.includes("signature verification failed")) ? 401 : 500,
            body: JSON.stringify({ error: err.message || 'Errore interno processamento webhook' })
        };
    }
};