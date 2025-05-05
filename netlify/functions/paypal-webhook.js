// netlify/functions/paypal-webhook.js - VERSIONE IBRIDA (Usa VECCHIO SDK per verifica)

const paypalCheckoutSdk = require('@paypal/checkout-server-sdk'); // VECCHIO SDK per verifica
const { createClient } = require('@supabase/supabase-js');

// Helper per ambiente PayPal (USA VECCHIO SDK)
function environment_v1() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    if (!clientId || !clientSecret) console.error("FATAL: PayPal Client ID/Secret missing");
    // return new paypalCheckoutSdk.core.LiveEnvironment(clientId, clientSecret); // Produzione
    return new paypalCheckoutSdk.core.SandboxEnvironment(clientId, clientSecret); // Test
}

// Helper per client PayPal (USA VECCHIO SDK)
function client_v1() { return new paypalCheckoutSdk.core.PayPalHttpClient(environment_v1()); }

// Inizializza client Supabase (uguale)
const supabase = createClient( process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY );

exports.handler = async (event, context) => {
    console.log("[paypal-webhook] Received event (Hybrid SDK version)");

    if (event.httpMethod !== 'POST') { return { statusCode: 405, body: 'Method Not Allowed' }; }

    // 1. Verifica Firma con VECCHIO SDK
    const headers = event.headers;
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;

    if (!webhookId) { /* ... gestione errore webhookId mancante ... */
        console.error("[paypal-webhook] FATAL: PAYPAL_WEBHOOK_ID missing.");
        return { statusCode: 500, body: 'Webhook config missing.' };
    }
    if (!headers['paypal-transmission-id'] || /* ... altri header ... */ !headers['paypal-cert-url']) {
        console.error("[paypal-webhook] Missing PayPal headers.");
        return { statusCode: 400, body: 'Missing PayPal headers.' };
    }

    // Usa il WebhooksVerifySignatureRequest del VECCHIO SDK
    const request = new paypalCheckoutSdk.webhooks.WebhooksVerifySignatureRequest();
    request.webhookId(webhookId);
    request.transmissionId(headers['paypal-transmission-id']);
    request.transmissionTime(headers['paypal-transmission-time']);
    request.transmissionSig(headers['paypal-transmission-sig']);
    request.authAlgo(headers['paypal-auth-algo']);
    request.certUrl(headers['paypal-cert-url']);
    request.requestBody(JSON.parse(event.body));

    try {
        console.log("[paypal-webhook] Verifying signature (using old SDK)...");
        // Usa il client del VECCHIO SDK per verificare
        const verification = await client_v1().execute(request);

        if (verification.result.verification_status !== 'SUCCESS') {
            console.warn('[paypal-webhook] Verification Failed (old SDK):', verification.result);
            return { statusCode: 401, body: 'Verification failed.' };
        }
        console.log("[paypal-webhook] Signature Verified (old SDK).");

        // 2. Processa Evento Verificato (logica uguale a prima)
        const webhookEvent = JSON.parse(event.body);
        console.log(`[paypal-webhook] Event Type: ${webhookEvent.event_type}`);

        if (webhookEvent.event_type === 'CHECKOUT.ORDER.APPROVED') {
            console.log("[paypal-webhook] Processing CHECKOUT.ORDER.APPROVED...");
            const orderId = webhookEvent.resource?.id;
            const status = webhookEvent.resource?.status;
            let lessonId = null; let userId = null;
            try { /* ... estrazione lessonId e userId da custom_id ... */
                 const customData = webhookEvent.resource?.purchase_units?.[0]?.custom_id;
                 if (customData && typeof customData === 'string') {
                     const parts = customData.split(';');
                     if(parts.length === 2){ lessonId = parts[0]; userId = parts[1]; console.log(`[webhook] Extracted: L=<span class="math-inline">\{lessonId\}, U\=</span>{userId}`);}
                     else { console.warn("[webhook] custom_id format unexpected:", customData); }
                 } else { console.warn("[webhook] custom_id missing/invalid."); }
             } catch (parseError) { console.error("[webhook] Error parsing custom_id:", parseError); }

            if (orderId && status === 'APPROVED' && lessonId && userId) {
                 // --- Controllo Idempotenza (uguale a prima) ---
                 console.log(`[webhook] Checking existing purchase for order ${orderId}...`);
                 const { data: existing, error: checkErr } = await supabase.from('purchases').select('id').eq('payment_provider', 'paypal').eq('payment_id', orderId).maybeSingle();
                 if (checkErr) { console.error("[webhook] Error checking existing:", checkErr); }
                 if (existing) {
                     console.log(`[webhook] Order ${orderId} already processed.`);
                     return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Duplicate' }) };
                 }
                 // --- Fine Controllo Idempotenza ---

                // 3. Inserisci in Supabase (uguale a prima)
                console.log(`[webhook] Inserting purchase: U=<span class="math-inline">\{userId\}, L\=</span>{lessonId}, O=${orderId}`);
                const { data: newPurchase, error: insertError } = await supabase.from('purchases').insert([{ user_id: userId, lesson_id: lessonId, payment_provider: 'paypal', payment_id: orderId, status: 'completed' }]).select();
                if (insertError) {
                    console.error('[webhook] Supabase insert error:', insertError);
                    return { statusCode: 200, body: JSON.stringify({ received: true, error: 'DB save failed' }) }; // Rispondi 200 a PayPal!
                }
                console.log('[webhook] Purchase recorded:', newPurchase);
            } else { console.warn("[webhook] Event data incomplete/invalid:", webhookEvent.resource); }
        } else { console.log(`[webhook] Event type ${webhookEvent.event_type} ignored.`); }

        // 4. Rispondi 200 OK a PayPal
        return { statusCode: 200, body: JSON.stringify({ received: true }) };

    } catch (err) {
        console.error('[paypal-webhook] ERROR processing webhook:', err);
        const isVerificationError = (err.message && err.message.toLowerCase().includes("verification failed"));
        return { statusCode: isVerificationError ? 401 : 500, body: JSON.stringify({ error: err.message || 'Webhook processing error' }) };
    }
};