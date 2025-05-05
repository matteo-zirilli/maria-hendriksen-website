// netlify/functions/paypal-webhook.js - VERSIONE CON SOLO @paypal/checkout-server-sdk (VECCHIO SDK)

const paypal = require('@paypal/checkout-server-sdk'); // VECCHIO SDK
const { createClient } = require('@supabase/supabase-js');

// Helper ambiente PayPal (VECCHIO SDK)
function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    if (!clientId || !clientSecret) console.error("FATAL: PayPal Client ID/Secret missing");
    // return new paypal.core.LiveEnvironment(clientId, clientSecret); // Produzione
    return new paypal.core.SandboxEnvironment(clientId, clientSecret); // Test
}
// Helper client PayPal (VECCHIO SDK)
function client() { return new paypal.core.PayPalHttpClient(environment()); }

// Client Supabase
const supabase = createClient( process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY );

exports.handler = async (event, context) => {
    console.log("[paypal-webhook] Received event (OLD SDK version)");

    if (event.httpMethod !== 'POST') { return { statusCode: 405, body: 'Method Not Allowed' }; }

    // 1. Verifica Firma con VECCHIO SDK
    const headers = event.headers;
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;

    if (!webhookId) { /* ... gestione errore webhookId mancante ... */ }
    if (!headers['paypal-transmission-id'] || /* ... altri header ... */ !headers['paypal-cert-url']) { /* ... return 400 ... */ }

    // Usa il WebhooksVerifySignatureRequest del VECCHIO SDK
    const request = new paypal.webhooks.WebhooksVerifySignatureRequest(); // << QUI AVVENIVA IL TYPEERROR PRIMA
    request.webhookId(webhookId);
    request.transmissionId(headers['paypal-transmission-id']);
    request.transmissionTime(headers['paypal-transmission-time']);
    request.transmissionSig(headers['paypal-transmission-sig']);
    request.authAlgo(headers['paypal-auth-algo']);
    request.certUrl(headers['paypal-cert-url']);
    // Verifica che event.body sia una stringa JSON valida prima di parsare
     try {
         if (typeof event.body !== 'string') throw new Error('Request body is not a string');
         request.requestBody(JSON.parse(event.body));
     } catch(e) {
         console.error("[paypal-webhook] Invalid JSON body received:", event.body, e);
         return { statusCode: 400, body: 'Bad Request: Invalid body' };
     }


    try {
        console.log("[paypal-webhook] Verifying signature (using old SDK)...");
        const verification = await client().execute(request); // Usa client VECCHIO SDK

        if (verification.result.verification_status !== 'SUCCESS') {
            console.warn('[paypal-webhook] Verification Failed (old SDK):', verification.result);
            return { statusCode: 401, body: 'Verification failed.' };
        }
        console.log("[paypal-webhook] Signature Verified (old SDK).");

        // 2. Processa Evento Verificato (logica uguale a prima)
        const webhookEvent = JSON.parse(event.body);
        console.log(`[paypal-webhook] Event Type: ${webhookEvent.event_type}`);

        if (webhookEvent.event_type === 'CHECKOUT.ORDER.APPROVED') {
            // ... (stessa logica di prima per estrarre dati e inserire in Supabase) ...
             console.log("[paypal-webhook] Processing CHECKOUT.ORDER.APPROVED...");
             const orderId = webhookEvent.resource?.id;
             const status = webhookEvent.resource?.status;
             let lessonId = null; let userId = null;
             try {
                  const customData = webhookEvent.resource?.purchase_units?.[0]?.custom_id;
                  if (customData && typeof customData === 'string') {
                      const parts = customData.split(';');
                      if(parts.length === 2){ lessonId = parts[0]; userId = parts[1]; console.log(`[webhook] Extracted: L=<span class="math-inline">\{lessonId\}, U\=</span>{userId}`);}
                      else { console.warn("[webhook] custom_id format unexpected:", customData); }
                  } else { console.warn("[webhook] custom_id missing/invalid."); }
              } catch (parseError) { console.error("[webhook] Error parsing custom_id:", parseError); }

             if (orderId && status === 'APPROVED' && lessonId && userId) {
                  console.log(`[webhook] Checking existing purchase for order ${orderId}...`);
                  const { data: existing, error: checkErr } = await supabase.from('purchases').select('id').eq('payment_provider', 'paypal').eq('payment_id', orderId).maybeSingle();
                  if (checkErr) { console.error("[webhook] Error checking existing:", checkErr); }
                  if (existing) {
                      console.log(`[webhook] Order ${orderId} already processed.`);
                      return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Duplicate' }) };
                  }
                  console.log(`[webhook] Inserting purchase: U=<span class="math-inline">\{userId\}, L\=</span>{lessonId}, O=${orderId}`);
                  const { data: newPurchase, error: insertError } = await supabase.from('purchases').insert([{ user_id: userId, lesson_id: lessonId, payment_provider: 'paypal', payment_id: orderId, status: 'completed' }]).select();
                  if (insertError) { console.error('[webhook] Supabase insert error:', insertError); return { statusCode: 200, body: JSON.stringify({ received: true, error: 'DB save failed' }) }; }
                  console.log('[webhook] Purchase recorded:', newPurchase);
             } else { console.warn("[webhook] Event data incomplete/invalid:", webhookEvent.resource); }

        } else { console.log(`[webhook] Event type ${webhookEvent.event_type} ignored.`); }

        // 4. Rispondi 200 OK a PayPal
        return { statusCode: 200, body: JSON.stringify({ received: true }) };

    } catch (err) { // Cattura errori dalla verifica o dal processamento
        console.error('[paypal-webhook] ERROR processing webhook:', err);
         // Se l'errore è durante la verifica, l'SDK V1 spesso ritorna statusCode nel .err
         const errorStatusCode = err.statusCode === 401 ? 401 : 500; // Se è errore di auth/verifica, 401, altrimenti 500 generico
        return { statusCode: errorStatusCode, body: JSON.stringify({ error: err.message || 'Webhook processing error' }) };
    }
};