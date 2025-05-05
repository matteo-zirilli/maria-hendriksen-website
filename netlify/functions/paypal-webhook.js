// netlify/functions/paypal-webhook.js - VERSIONE CORRETTA (si spera) con @paypal/checkout-server-sdk (VECCHIO SDK) e LOG AGGIUNTIVI

// MODIFICA: Cambia il nome della variabile importata per chiarezza e usa quello ovunque
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk'); // VECCHIO SDK
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
        // Considera di lanciare un errore qui o gestire diversamente
        // throw new Error("PayPal credentials missing in environment variables");
    }
    // MODIFICA: Usa checkoutNodeJssdk
    // return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret); // Produzione
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret); // Test
}

// Helper client PayPal (VECCHIO SDK)
function client() {
    // MODIFICA: Usa checkoutNodeJssdk
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

// Client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// LOG AGGIUNTO: Verifica presenza credenziali Supabase (senza loggarle!)
console.log("[paypal-webhook] SUPABASE_URL presente:", !!supabaseUrl);
console.log("[paypal-webhook] SUPABASE_SERVICE_ROLE_KEY presente:", !!supabaseServiceKey);
if (!supabaseUrl || !supabaseServiceKey) {
    console.error("[paypal-webhook] FATAL: SUPABASE_URL e/o SUPABASE_SERVICE_ROLE_KEY mancanti nelle variabili d'ambiente Netlify.");
    // Gestire l'errore criticamente
    // throw new Error("Supabase credentials missing in environment variables");
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

exports.handler = async (event, context) => {
    // LOG AGGIUNTO: Log iniziale più dettagliato
    console.log("------------------------------------------------------");
    console.log(`[paypal-webhook] Invocazione ricevuta (OLD SDK version) - ID: ${context.awsRequestId}`); // Aggiunto ID richiesta Netlify
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
        'paypal-transmission-sig': headers['paypal-transmission-sig'] ? 'Presente' : 'MANCANTE!', // Non loggare la firma completa
        'paypal-auth-algo': headers['paypal-auth-algo'],
        'paypal-cert-url': headers['paypal-cert-url'],
        'content-type': headers['content-type']
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
    console.log("[paypal-webhook] Raw body ricevuto (lunghezza):", event.body?.length || 0);
    console.log("[paypal-webhook] Tipo del body:", typeof event.body);

    // MODIFICA CRUCIALE: Usa checkoutNodeJssdk per accedere a webhooks.WebhooksVerifySignatureRequest
    let request;
    try {
        // Istanzia la richiesta usando il nome corretto dell'import
        request = new checkoutNodeJssdk.webhooks.WebhooksVerifySignatureRequest();
        console.log("[paypal-webhook] Oggetto WebhooksVerifySignatureRequest istanziato correttamente.");
    } catch (instantiationError) {
        // Questo catch è un'ulteriore misura di sicurezza
        console.error("[paypal-webhook] ERRORE CRITICO: Impossibile istanziare WebhooksVerifySignatureRequest. SDK non caricato/strutturato come atteso?", instantiationError);
        // Logga l'oggetto importato per vedere cosa contiene effettivamente
        console.error("[paypal-webhook] Struttura di checkoutNodeJssdk:", Object.keys(checkoutNodeJssdk).join(', '));
        return { statusCode: 500, body: 'Internal Server Error: SDK setup issue' };
    }

    let parsedRequestBody; // Variabile per memorizzare il corpo parsato

    try {
        if (typeof event.body !== 'string' || event.body.trim() === '') {
             throw new Error('Request body is not a non-empty string');
        }
        parsedRequestBody = JSON.parse(event.body); // Parsa qui una volta
        // L'SDK VECCHIO per la verifica si aspetta l'OGGETTO JS parsato, NON la stringa JSON
        request.requestBody(parsedRequestBody);
        console.log("[paypal-webhook] Body parsato con successo per la verifica.");

        // Imposta gli altri parametri della richiesta di verifica
        request.webhookId(webhookId);
        request.transmissionId(headers['paypal-transmission-id']);
        request.transmissionTime(headers['paypal-transmission-time']);
        request.transmissionSig(headers['paypal-transmission-sig']);
        request.authAlgo(headers['paypal-auth-algo']);
        request.certUrl(headers['paypal-cert-url']);
        console.log("[paypal-webhook] Parametri richiesta verifica impostati.");

    } catch (e) {
        console.error("[paypal-webhook] Errore nel parsing del JSON body o body non valido:", e.message);
        console.error("[paypal-webhook] Body ricevuto che ha causato l'errore (primi 500 caratteri):", event.body?.substring(0, 500));
        return { statusCode: 400, body: 'Bad Request: Invalid or empty body' };
    }

    try {
        console.log("[paypal-webhook] Tentativo di verifica firma con SDK PayPal VECCHIO...");
        // Assicurati che client() restituisca un'istanza valida di PayPalHttpClient
        const paypalClient = client();
        if (!paypalClient || typeof paypalClient.execute !== 'function') {
             console.error("[paypal-webhook] Errore: client PayPal non inizializzato correttamente.");
             return { statusCode: 500, body: 'Internal Server Error: PayPal client setup issue' };
        }
        const verification = await paypalClient.execute(request); // Usa client VECCHIO SDK

        // LOG AGGIUNTO: Log del risultato della verifica
        console.log("[paypal-webhook] Risultato grezzo della verifica:", JSON.stringify(verification, null, 2));

        if (verification.result?.verification_status !== 'SUCCESS') { // Aggiunto optional chaining (?) per sicurezza
            console.warn('[paypal-webhook] VERIFICA FIRMA FALLITA (old SDK). Status:', verification.result?.verification_status);
            // Potrebbe essere utile loggare anche gli header inviati per confronto manuale
            return { statusCode: 401, body: 'Verification failed.' };
        }
        console.log("[paypal-webhook] === VERIFICA FIRMA RIUSCITA (old SDK) ===");

        // 2. Processa Evento Verificato
        // Usa l'oggetto già parsato 'parsedRequestBody' invece di ri-parsare event.body
        const webhookEvent = parsedRequestBody;
        // LOG AGGIUNTO: Log dell'evento completo dopo la verifica
        // console.log("[paypal-webhook] Evento verificato ricevuto:", JSON.stringify(webhookEvent, null, 2)); // Log molto verboso, commentare se non necessario
        console.log(`[paypal-webhook] Tipo Evento: ${webhookEvent.event_type}`);
        console.log(`[paypal-webhook] ID Evento: ${webhookEvent.id}`);
        console.log(`[paypal-webhook] ID Risorsa (Ordine): ${webhookEvent.resource?.id}`);


        if (webhookEvent.event_type === 'CHECKOUT.ORDER.APPROVED') {
             console.log("[paypal-webhook] Processando evento CHECKOUT.ORDER.APPROVED...");

             // LOG AGGIUNTO: Estrazione dati con log più specifici
             const orderId = webhookEvent.resource?.id;
             const status = webhookEvent.resource?.status;
             const amount = webhookEvent.resource?.purchase_units?.[0]?.amount?.value;
             const currency = webhookEvent.resource?.purchase_units?.[0]?.amount?.currency_code;
             const payerEmail = webhookEvent.resource?.payer?.email_address;
             const customData = webhookEvent.resource?.purchase_units?.[0]?.custom_id;

             console.log(`[webhook] Dati estratti: orderId=${orderId}, status=${status}, amount=${amount}, currency=${currency}, payerEmail=${payerEmail}, customData='${customData}'`);

             let lessonId = null;
             let userId = null;
             if (customData && typeof customData === 'string') {
                 const parts = customData.split(';');
                 lessonId = parts[0]; // Prendi sempre la prima parte come lessonId
                 if (parts.length === 2 && parts[1]) { // Se c'è una seconda parte non vuota, è userId
                     userId = parts[1];
                     console.log(`[webhook] custom_id parsato: lessonId='${lessonId}', userId='${userId}'`);
                 } else if (parts.length === 1 && parts[0]) { // Modificato per controllare che parts[0] non sia vuota
                     console.log(`[webhook] custom_id parsato: lessonId='${lessonId}', userId mancante (formato solo lessonId)`);
                 } else { // Casi: vuoto, solo ';', 'id;', ';id', 'id;id;altro', ecc.
                     console.warn("[webhook] Formato custom_id non riconosciuto o parzialmente vuoto (atteso 'lessonId;userId' o 'lessonId'):", customData);
                     if(!lessonId) console.warn("[webhook] Impossibile estrarre lessonId valido da custom_id.");
                 }
             } else {
                 console.warn("[webhook] custom_id mancante o non è una stringa.");
             }

             // Verifica dati necessari per l'inserimento
             // È essenziale avere orderId e lessonId. userId è opzionale.
             if (orderId && status === 'APPROVED' && lessonId) {
                  console.log(`[webhook] Dati validi per l'inserimento (UserID: ${userId || 'Non fornito'}). Controllo duplicati per orderId: ${orderId}`);

                  let existingPurchase = null;
                  let checkError = null;
                  try {
                      console.log(`[webhook] Eseguendo query: supabase.from('purchases').select('id').eq('payment_provider', 'paypal').eq('payment_id', '${orderId}').maybeSingle()`);
                      const { data: existing, error: checkErr } = await supabase
                          .from('purchases')
                          .select('id')
                          .eq('payment_provider', 'paypal')
                          .eq('payment_id', orderId)
                          .maybeSingle();

                      existingPurchase = existing;
                      checkError = checkErr;
                  } catch (e) {
                      console.error("[webhook] Eccezione durante il controllo duplicati Supabase:", e);
                      checkError = e; // Tratta l'eccezione come un errore di controllo
                  }

                  if (checkError) {
                      console.error("[webhook] Errore Supabase durante il controllo duplicati:", JSON.stringify(checkError, null, 2));
                       return { statusCode: 500, body: JSON.stringify({ received: true, error: 'DB check failed' }) };
                  }

                  if (existingPurchase) {
                      console.log(`[webhook] Ordine ${orderId} GIA' PRESENTE nel database (ID: ${existingPurchase.id}). Salto inserimento.`);
                      return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Duplicate event ignored' }) };
                  }

                  console.log(`[webhook] Ordine ${orderId} non trovato. Procedo con l'inserimento nella tabella 'purchases'.`);
                  const purchaseRecord = {
                      user_id: userId || null, // Inserisci null se userId non è stato trovato/fornito
                      lesson_id: lessonId,
                      payment_provider: 'paypal',
                      payment_id: orderId,
                      status: 'completed', // Potresti voler mappare 'APPROVED' a 'pending' e usare un altro evento (es. CAPTURE) per 'completed'
                      amount: amount ? parseFloat(amount) : null,
                      currency: currency || null,
                      payer_email: payerEmail || null,
                      raw_payload: webhookEvent // Salva l'intero payload per analisi future
                  };
                  console.log('[webhook] Record da inserire:', JSON.stringify(purchaseRecord, null, 2)); // Logga l'oggetto completo

                  try {
                       console.log(`[webhook] Eseguendo query: supabase.from('purchases').insert([{...}]).select()`);
                       const { data: newPurchase, error: insertError } = await supabase
                           .from('purchases')
                           .insert([purchaseRecord])
                           .select();

                       if (insertError) {
                           console.error('[webhook] Errore Supabase durante l\'inserimento:', JSON.stringify(insertError, null, 2));
                           // Dettaglio errore per il log
                           console.error(`[webhook] Dettaglio Errore Supabase: message='${insertError.message}', details='${insertError.details}', hint='${insertError.hint}', code='${insertError.code}'`);
                           return { statusCode: 200, body: JSON.stringify({ received: true, error: 'DB save failed', details: insertError.message }) };
                       }

                       console.log('[webhook] === INSERIMENTO SU SUPABASE RIUSCITO ===');
                       console.log('[webhook] Record inserito:', JSON.stringify(newPurchase, null, 2));

                  } catch(e) {
                       console.error("[webhook] Eccezione durante l'inserimento Supabase:", e);
                       return { statusCode: 500, body: JSON.stringify({ received: true, error: 'DB insert exception', details: e.message }) };
                  }

             } else {
                 console.warn("[webhook] Dati incompleti o status non 'APPROVED' per processare l'evento. Dati mancanti o non validi:", JSON.stringify({ orderId, status, lessonId, userId }));
             }

        } else {
             console.log(`[webhook] Tipo evento ${webhookEvent.event_type} (${webhookEvent.id}) ricevuto ma ignorato.`);
        }

        console.log("[paypal-webhook] Processamento completato con successo (o evento ignorato). Invio risposta 200 a PayPal.");
        return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Webhook processed successfully or ignored' }) };

    } catch (err) { // Cattura errori dalla verifica o dal processamento generale
        console.error('[paypal-webhook] ERRORE FATALE durante il processamento del webhook:', err);
        console.error('[paypal-webhook] Dettagli Errore:', err.message, err.stack);
        // Se l'errore ha una risposta (es. errore HTTP dall'SDK)
        if (err.response) {
             console.error('[paypal-webhook] Dati Risposta Errore SDK:', JSON.stringify(err.response, null, 2));
        }
        // Se l'errore ha uno status code (come gli errori di verifica dell'SDK vecchio)
        const errorStatusCode = err.statusCode || 500; // Usa statusCode dell'errore se esiste, altrimenti 500
        console.log(`[paypal-webhook] Invio risposta ${errorStatusCode} a PayPal a causa dell'errore.`);
        return { statusCode: errorStatusCode, body: JSON.stringify({ error: 'Webhook processing error', details: err.message || 'Unknown error' }) };
    } finally {
        console.log(`[paypal-webhook] Esecuzione terminata per invocazione ${context.awsRequestId}.`);
        console.log("------------------------------------------------------");
    }
};