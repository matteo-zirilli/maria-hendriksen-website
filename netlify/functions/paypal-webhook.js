// netlify/functions/paypal-webhook.js - VERSIONE CON SOLO @paypal/checkout-server-sdk (VECCHIO SDK) e LOG AGGIUNTIVI

const paypal = require('@paypal/checkout-server-sdk'); // VECCHIO SDK
const { createClient } = require('@supabase/supabase-js');

// Helper ambiente PayPal (VECCHIO SDK)
function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    // LOG AGGIUNTO: Verifica presenza credenziali PayPal (senza loggarle!)
    console.log("[paypal-webhook] PAYPAL_CLIENT_ID presente:", !!clientId);
    console.log("[paypal-webhook] PAYPAL_CLIENT_SECRET presente:", !!clientSecret);
    if (!clientId || !clientSecret) {
        console.error("[paypal-webhook] FATAL: PayPal Client ID e/o Client Secret mancanti nelle variabili d'ambiente Netlify.");
        // In un caso reale, potresti voler lanciare un errore o gestire diversamente
    }
    // return new paypal.core.LiveEnvironment(clientId, clientSecret); // Produzione
    return new paypal.core.SandboxEnvironment(clientId, clientSecret); // Test
}
// Helper client PayPal (VECCHIO SDK)
function client() { return new paypal.core.PayPalHttpClient(environment()); }

// Client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// LOG AGGIUNTO: Verifica presenza credenziali Supabase (senza loggarle!)
console.log("[paypal-webhook] SUPABASE_URL presente:", !!supabaseUrl);
console.log("[paypal-webhook] SUPABASE_SERVICE_ROLE_KEY presente:", !!supabaseServiceKey);
if (!supabaseUrl || !supabaseServiceKey) {
    console.error("[paypal-webhook] FATAL: SUPABASE_URL e/o SUPABASE_SERVICE_ROLE_KEY mancanti nelle variabili d'ambiente Netlify.");
    // Gestire l'errore критически
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

exports.handler = async (event, context) => {
    // LOG AGGIUNTO: Log iniziale più dettagliato
    console.log("------------------------------------------------------");
    console.log("[paypal-webhook] Invocazione ricevuta (OLD SDK version)");
    console.log("[paypal-webhook] Metodo HTTP:", event.httpMethod);
    console.log("[paypal-webhook] Path:", event.path);

    if (event.httpMethod !== 'POST') {
        console.warn("[paypal-webhook] Metodo non consentito:", event.httpMethod);
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // 1. Verifica Firma con VECCHIO SDK
    const headers = event.headers;
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;

    // LOG AGGIUNTO: Log header rilevanti e Webhook ID
    console.log("[paypal-webhook] PAYPAL_WEBHOOK_ID:", webhookId ? 'Presente' : 'MANCANTE!');
    console.log("[paypal-webhook] Headers ricevuti per verifica:", JSON.stringify({
        'paypal-transmission-id': headers['paypal-transmission-id'],
        'paypal-transmission-time': headers['paypal-transmission-time'],
        'paypal-transmission-sig': headers['paypal-transmission-sig'],
        'paypal-auth-algo': headers['paypal-auth-algo'],
        'paypal-cert-url': headers['paypal-cert-url'],
        'content-type': headers['content-type'] // Utile per debug
    }));

    // LOG AGGIUNTO: Controlli espliciti su ID e header necessari
    if (!webhookId) {
        console.error("[paypal-webhook] Errore: PAYPAL_WEBHOOK_ID non configurato nelle variabili d'ambiente.");
        return { statusCode: 500, body: 'Server configuration error: Missing webhook ID' };
    }
    if (!headers['paypal-transmission-id'] || !headers['paypal-transmission-time'] || !headers['paypal-transmission-sig'] || !headers['paypal-auth-algo'] || !headers['paypal-cert-url']) {
        console.error("[paypal-webhook] Errore: Header PayPal mancanti per la verifica della firma.");
        return { statusCode: 400, body: 'Bad Request: Missing PayPal headers' };
    }

    // LOG AGGIUNTO: Log del body *prima* del parsing per la verifica
    console.log("[paypal-webhook] Raw body ricevuto:", event.body);
    console.log("[paypal-webhook] Tipo del body:", typeof event.body);

    // Usa il WebhooksVerifySignatureRequest del VECCHIO SDK
    const request = new paypal.webhooks.WebhooksVerifySignatureRequest();
    let parsedRequestBody; // Variabile per memorizzare il corpo parsato

    try {
        if (typeof event.body !== 'string' || event.body.trim() === '') {
             throw new Error('Request body is not a non-empty string');
        }
        parsedRequestBody = JSON.parse(event.body); // Parsa qui una volta
        request.requestBody(parsedRequestBody); // Passa l'oggetto JS, non la stringa
        console.log("[paypal-webhook] Body parsato con successo per la verifica.");

        // Imposta gli altri parametri della richiesta di verifica
        request.webhookId(webhookId);
        request.transmissionId(headers['paypal-transmission-id']);
        request.transmissionTime(headers['paypal-transmission-time']);
        request.transmissionSig(headers['paypal-transmission-sig']);
        request.authAlgo(headers['paypal-auth-algo']);
        request.certUrl(headers['paypal-cert-url']);

    } catch (e) {
        console.error("[paypal-webhook] Errore nel parsing del JSON body o body non valido:", e.message);
        console.error("[paypal-webhook] Body ricevuto che ha causato l'errore:", event.body);
        return { statusCode: 400, body: 'Bad Request: Invalid or empty body' };
    }

    try {
        console.log("[paypal-webhook] Tentativo di verifica firma con SDK PayPal VECCHIO...");
        const verification = await client().execute(request); // Usa client VECCHIO SDK

        // LOG AGGIUNTO: Log del risultato della verifica
        console.log("[paypal-webhook] Risultato grezzo della verifica:", JSON.stringify(verification, null, 2));

        if (verification.result?.verification_status !== 'SUCCESS') { // Aggiunto optional chaining (?) per sicurezza
            console.warn('[paypal-webhook] VERIFICA FIRMA FALLITA (old SDK). Status:', verification.result?.verification_status);
            return { statusCode: 401, body: 'Verification failed.' };
        }
        console.log("[paypal-webhook] === VERIFICA FIRMA RIUSCITA (old SDK) ===");

        // 2. Processa Evento Verificato
        // Usa l'oggetto già parsato 'parsedRequestBody' invece di ri-parsare event.body
        const webhookEvent = parsedRequestBody;
        // LOG AGGIUNTO: Log dell'evento completo dopo la verifica
        console.log("[paypal-webhook] Evento verificato ricevuto:", JSON.stringify(webhookEvent, null, 2));
        console.log(`[paypal-webhook] Tipo Evento: ${webhookEvent.event_type}`);

        if (webhookEvent.event_type === 'CHECKOUT.ORDER.APPROVED') {
             console.log("[paypal-webhook] Processando evento CHECKOUT.ORDER.APPROVED...");

             // LOG AGGIUNTO: Estrazione dati con log più specifici
             const orderId = webhookEvent.resource?.id;
             const status = webhookEvent.resource?.status;
             const amount = webhookEvent.resource?.purchase_units?.[0]?.amount?.value;
             const currency = webhookEvent.resource?.purchase_units?.[0]?.amount?.currency_code;
             const payerEmail = webhookEvent.resource?.payer?.email_address;
             const customData = webhookEvent.resource?.purchase_units?.[0]?.custom_id;

             console.log(`[webhook] Dati estratti: orderId=${orderId}, status=${status}, amount=${amount}, currency=${currency}, payerEmail=${payerEmail}, customData=${customData}`);

             let lessonId = null;
             let userId = null;
             if (customData && typeof customData === 'string') {
                 const parts = customData.split(';');
                 if (parts.length === 2) {
                     lessonId = parts[0];
                     userId = parts[1];
                     console.log(`[webhook] custom_id parsato: lessonId='${lessonId}', userId='${userId}'`);
                 } else {
                     console.warn("[webhook] Formato custom_id non riconosciuto (atteso 'lessonId;userId'):", customData);
                 }
             } else {
                 console.warn("[webhook] custom_id mancante o non è una stringa.");
             }

             // LOG AGGIUNTO: Verifica dati necessari per l'inserimento
             if (orderId && status === 'APPROVED' && lessonId && userId) {
                  console.log(`[webhook] Dati validi per l'inserimento. Controllo duplicati per orderId: ${orderId}`);

                  // LOG AGGIUNTO: Log prima del controllo duplicati
                  let existingPurchase = null;
                  let checkError = null;
                  try {
                      const { data: existing, error: checkErr } = await supabase
                          .from('purchases')
                          .select('id') // Seleziona solo l'ID, è sufficiente
                          .eq('payment_provider', 'paypal')
                          .eq('payment_id', orderId)
                          .maybeSingle(); // Ottieni null se non trovato, o l'oggetto se trovato

                      existingPurchase = existing;
                      checkError = checkErr;
                  } catch (e) {
                      console.error("[webhook] Eccezione durante il controllo duplicati Supabase:", e);
                      checkError = e; // Tratta l'eccezione come un errore di controllo
                  }

                  // LOG AGGIUNTO: Log risultato controllo duplicati
                  if (checkError) {
                      console.error("[webhook] Errore Supabase durante il controllo duplicati:", JSON.stringify(checkError, null, 2));
                      // Decidi se bloccare o tentare comunque l'inserimento. È più sicuro bloccare.
                       return { statusCode: 500, body: JSON.stringify({ received: true, error: 'DB check failed' }) };
                  }

                  if (existingPurchase) {
                      console.log(`[webhook] Ordine ${orderId} GIA' PRESENTE nel database (ID: ${existingPurchase.id}). Salto inserimento.`);
                      return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Duplicate event ignored' }) };
                  }

                  // LOG AGGIUNTO: Dettagli prima dell'inserimento
                  console.log(`[webhook] Ordine ${orderId} non trovato. Procedo con l'inserimento nella tabella 'purchases'.`);
                  const purchaseRecord = {
                      user_id: userId,
                      lesson_id: lessonId,
                      payment_provider: 'paypal',
                      payment_id: orderId, // Questo è l'ID ordine PayPal
                      status: 'completed', // O basato sullo status del webhook se più granulare
                      amount: amount ? parseFloat(amount) : null, // LOG AGGIUNTO: Salva anche importo/valuta se vuoi
                      currency: currency,
                      payer_email: payerEmail, // LOG AGGIUNTO: Salva email pagatore
                      raw_payload: webhookEvent // LOG AGGIUNTO: Salva tutto il payload per debug futuro
                  };
                  console.log('[webhook] Record da inserire:', JSON.stringify(purchaseRecord, null, 2));

                  try {
                       const { data: newPurchase, error: insertError } = await supabase
                           .from('purchases')
                           .insert([purchaseRecord]) // insert() si aspetta un array
                           .select(); // Restituisce i dati inseriti

                       if (insertError) {
                           console.error('[webhook] Errore Supabase durante l\'inserimento:', JSON.stringify(insertError, null, 2));
                           // Rispondere 200 a PayPal evita retries, ma segnala l'errore nel body
                           return { statusCode: 200, body: JSON.stringify({ received: true, error: 'DB save failed', details: insertError.message }) };
                       }

                       console.log('[webhook] === INSERIMENTO SU SUPABASE RIUSCITO ===');
                       console.log('[webhook] Record inserito:', JSON.stringify(newPurchase, null, 2));

                  } catch(e) {
                       console.error("[webhook] Eccezione durante l'inserimento Supabase:", e);
                       return { statusCode: 500, body: JSON.stringify({ received: true, error: 'DB insert exception', details: e.message }) };
                  }

             } else {
                 console.warn("[webhook] Dati incompleti o status non 'APPROVED' per processare l'evento. Dati ricevuti:", JSON.stringify({ orderId, status, lessonId, userId }));
             }

        } else {
             console.log(`[webhook] Tipo evento ${webhookEvent.event_type} ricevuto ma ignorato.`);
        }

        // 4. Rispondi 200 OK a PayPal se tutto ok fin qui (o se l'evento è stato ignorato volutamente)
        console.log("[paypal-webhook] Processamento completato. Invio risposta 200 a PayPal.");
        return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Webhook processed successfully' }) };

    } catch (err) { // Cattura errori dalla verifica o dal processamento generale
        console.error('[paypal-webhook] ERRORE FATALE durante il processamento del webhook:', err);
        // LOG AGGIUNTO: Log più dettagliato dell'errore
        console.error('[paypal-webhook] Dettagli Errore:', err.message, err.stack);
        if (err.response) { // Errore specifico dall'SDK HTTP client?
             console.error('[paypal-webhook] Dati Risposta Errore SDK:', JSON.stringify(err.response, null, 2));
        }

        // Se l'errore è durante la verifica, l'SDK V1 spesso ritorna statusCode nel .err
        const errorStatusCode = err.statusCode === 401 ? 401 : 500; // Se è errore di auth/verifica, 401, altrimenti 500 generico
        console.log(`[paypal-webhook] Invio risposta ${errorStatusCode} a PayPal a causa dell'errore.`);
        return { statusCode: errorStatusCode, body: JSON.stringify({ error: 'Webhook processing error', details: err.message || 'Unknown error' }) };
    } finally {
        console.log("[paypal-webhook] Esecuzione terminata.");
        console.log("------------------------------------------------------");
    }
};