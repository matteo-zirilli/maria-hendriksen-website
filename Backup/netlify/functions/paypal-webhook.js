// netlify/functions/paypal-webhook.js - VERSIONE CON VERIFICA MANUALE DELLA FIRMA

// Import moduli necessari
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto'); // Modulo crypto di Node.js (integrato)
const axios = require('axios');   // Per le richieste HTTP (necessita 'npm install axios')
const crc = require('crc');       // Per il calcolo del CRC32 (necessita 'npm install crc')

// --- Configurazione Client Supabase ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Log e controllo variabili d'ambiente Supabase all'avvio
console.log("[paypal-webhook] Initializing...");
console.log("[paypal-webhook] SUPABASE_URL presente:", !!supabaseUrl);
console.log("[paypal-webhook] SUPABASE_SERVICE_ROLE_KEY presente:", !!supabaseServiceKey);
if (!supabaseUrl || !supabaseServiceKey) {
    console.error("[paypal-webhook] FATAL: SUPABASE_URL e/o SUPABASE_SERVICE_ROLE_KEY mancanti nelle variabili d'ambiente Netlify.");
    // In un ambiente reale, potresti voler impedire l'avvio della funzione
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);
console.log("[paypal-webhook] Supabase client initialized.");
// --- Fine Configurazione Client Supabase ---


// --- Funzione Helper per Verifica Firma Manuale ---
async function verifyPayPalSignature(headers, rawBody, webhookId) {
    console.log("[verifyPayPalSignature] Inizio verifica manuale...");

    // Estrarre gli header necessari
    const transmissionId = headers['paypal-transmission-id'];
    const transmissionTime = headers['paypal-transmission-time'];
    const transmissionSig = headers['paypal-transmission-sig']; // Firma in Base64
    const certUrl = headers['paypal-cert-url'];
    const authAlgo = headers['paypal-auth-algo']; // Es: "SHA256withRSA"

    // Controlli preliminari
    if (!transmissionId || !transmissionTime || !transmissionSig || !certUrl || !authAlgo || !webhookId || rawBody === undefined || rawBody === null) {
        console.error("[verifyPayPalSignature] Dati mancanti per la verifica:", { transmissionId: !!transmissionId, transmissionTime: !!transmissionTime, transmissionSig: !!transmissionSig, certUrl: !!certUrl, authAlgo: !!authAlgo, webhookId: !!webhookId, rawBodyProvided: !(rawBody === undefined || rawBody === null) });
        return false;
    }
    // Assicurati che rawBody sia una stringa (Netlify di solito lo passa come stringa)
    if (typeof rawBody !== 'string') {
        console.error(`[verifyPayPalSignature] Errore: rawBody non è una stringa (tipo: ${typeof rawBody}). Impossibile calcolare CRC32.`);
        return false;
    }
    console.log("[verifyPayPalSignature] Dati necessari presenti.");
    console.log("[verifyPayPalSignature] Algoritmo dichiarato:", authAlgo);

    try {
        // 1. Scaricare il certificato pubblico di PayPal
        console.log(`[verifyPayPalSignature] Scaricamento certificato da: ${certUrl}`);
        const response = await axios.get(certUrl, { timeout: 10000 }); // Timeout 10s
        const certificatePem = response.data;
        if (response.status !== 200 || !certificatePem) {
             console.error(`[verifyPayPalSignature] Fallito scaricamento certificato. Status: ${response.status}`);
             return false;
        }
        console.log("[verifyPayPalSignature] Certificato scaricato con successo.");

        // 2. Estrarre la chiave pubblica dal certificato
        const publicKey = crypto.createPublicKey(certificatePem);
        console.log("[verifyPayPalSignature] Chiave pubblica estratta dal certificato.");

        // 3. Calcolare il CRC32 del corpo della richiesta raw (come numero)
        const crc32OfBody = crc.crc32(rawBody); // Calcola il CRC32
        console.log("[verifyPayPalSignature] CRC32 calcolato:", crc32OfBody);

        // 4. Costruire la stringa da verificare
        // Formato: transmissionId|transmissionTime|webhookId|crc32(rawRequestBody)
        const signatureString = `${transmissionId}|${transmissionTime}|${webhookId}|${crc32OfBody}`;
        // Non loggare la stringa completa per sicurezza/brevità di default
        console.log("[verifyPayPalSignature] Stringa da verificare costruita.");

        // 5. Mappare l'algoritmo PayPal al nome usato da Node Crypto
        let nodeAuthAlgo;
        // Mappa comune, potrebbe servire estenderla se PayPal usa altri algoritmi
        const algoMap = {
             'SHA256WITHRSA': 'RSA-SHA256',
             // Aggiungere altre mappature se necessario
        };
        nodeAuthAlgo = algoMap[authAlgo?.toUpperCase()]; // Cerca nel map (case-insensitive)

        if (!nodeAuthAlgo) {
            console.error(`[verifyPayPalSignature] Algoritmo di autenticazione non supportato o mappatura mancante: ${authAlgo}`);
            return false;
        }
        console.log(`[verifyPayPalSignature] Algoritmo mappato per Node Crypto: ${nodeAuthAlgo}`);

        // 6. Verificare la firma
        const verifier = crypto.createVerify(nodeAuthAlgo);
        verifier.update(signatureString); // Passa la stringa costruita

        // Verifica la firma (transmissionSig è in Base64)
        const isVerified = verifier.verify(publicKey, transmissionSig, 'base64');

        console.log(`[verifyPayPalSignature] Esito verifica crittografica: ${isVerified}`);
        return isVerified;

    } catch (error) {
        console.error("[verifyPayPalSignature] Errore durante il processo di verifica manuale:", error);
        if (error.isAxiosError) {
            console.error("[verifyPayPalSignature] Errore Axios (richiesta certificato):", error.message, error.response?.status);
        } else if (error.code) { // Spesso errori crypto hanno un codice
             console.error("[verifyPayPalSignature] Errore Crypto:", error.message, error.code);
        } else {
             console.error("[verifyPayPalSignature] Errore generico in verifica:", error.message, error.stack);
        }
        return false; // In caso di qualsiasi errore, la verifica fallisce per sicurezza
    }
}
// --- Fine Funzione Helper ---


// --- Handler Principale Netlify Function ---
exports.handler = async (event, context) => {
    const invocationId = context.awsRequestId || `local-${Date.now()}`; // ID per tracciare l'invocazione
    console.log("------------------------------------------------------");
    console.log(`[paypal-webhook] Invocazione ricevuta (VERIFICA MANUALE) - ID: ${invocationId}`);
    console.log("[paypal-webhook] Metodo HTTP:", event.httpMethod);
    console.log("[paypal-webhook] Path:", event.path);

    // 0. Controllo Metodo HTTP
    if (event.httpMethod !== 'POST') {
        console.warn(`[${invocationId}] Metodo non consentito: ${event.httpMethod}`);
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // 1. Estrazione Dati per Verifica
    const headers = event.headers;
    const webhookId = process.env.PAYPAL_WEBHOOK_ID; // Da variabili d'ambiente Netlify
    const rawBody = event.body; // Body grezzo (stringa JSON)

    // Log e controlli preliminari
    console.log(`[${invocationId}] PAYPAL_WEBHOOK_ID presente:`, !!webhookId);
    console.log(`[${invocationId}] Headers ricevuti (chiavi):`, Object.keys(headers).join(', '));
    // Non loggare l'intera firma Base64 per sicurezza
    console.log(`[${invocationId}] Header paypal-transmission-sig presente:`, !!headers['paypal-transmission-sig']);

    if (!webhookId) {
        console.error(`[${invocationId}] Errore: PAYPAL_WEBHOOK_ID non configurato.`);
        return { statusCode: 500, body: 'Server configuration error: Missing webhook ID' };
    }
    if (!headers['paypal-transmission-id'] || !headers['paypal-transmission-time'] || !headers['paypal-transmission-sig'] || !headers['paypal-auth-algo'] || !headers['paypal-cert-url']) {
        console.error(`[${invocationId}] Errore: Header PayPal essenziali per la verifica mancanti.`);
        return { statusCode: 400, body: 'Bad Request: Missing PayPal headers' };
    }
    if (rawBody === undefined || rawBody === null || typeof rawBody !== 'string') {
         console.error(`[${invocationId}] Errore: Body della richiesta mancante o non è una stringa.`);
         return { statusCode: 400, body: 'Bad Request: Missing or invalid body' };
    }
    console.log(`[${invocationId}] Raw body ricevuto (lunghezza): ${rawBody.length}`);

    // 2. Esecuzione Verifica Firma Manuale
    let isVerified = false;
    try {
        console.log(`[${invocationId}] Avvio chiamata a verifyPayPalSignature...`);
        isVerified = await verifyPayPalSignature(headers, rawBody, webhookId);
    } catch (verificationError) {
        console.error(`[${invocationId}] Errore imprevisto durante la chiamata a verifyPayPalSignature:`, verificationError);
        isVerified = false; // Assicurati che sia false
    }

    // 3. Controllo Esito Verifica
    if (!isVerified) {
        console.warn(`[${invocationId}] === VERIFICA FIRMA MANUALE FALLITA ===`);
        // Rispondere 401 Unauthorized a PayPal
        return { statusCode: 401, body: 'Webhook signature verification failed.' };
    }

    console.log(`[${invocationId}] === VERIFICA FIRMA MANUALE RIUSCITA ===`);

    // 4. Parsing del Body (solo dopo verifica OK)
    let webhookEvent;
    try {
        webhookEvent = JSON.parse(rawBody);
        console.log(`[${invocationId}] Evento verificato parsato. Tipo: ${webhookEvent?.event_type}, ID: ${webhookEvent?.id}`);
    } catch (parseError) {
        console.error(`[${invocationId}] Errore parsing JSON dopo verifica:`, parseError);
        console.error(`[${invocationId}] Body (inizio):`, rawBody.substring(0, 500));
        // Se il JSON non è valido, non possiamo processarlo
        return { statusCode: 400, body: 'Bad Request: Invalid JSON body after verification.' };
    }

    // 5. Processamento dell'Evento Verificato
    try {
        const eventType = webhookEvent.event_type;
        const resource = webhookEvent.resource; // Oggetto risorsa (es. ordine)

        console.log(`[${invocationId}] Processando evento: ${eventType}`);

        if (eventType === 'CHECKOUT.ORDER.APPROVED') {
            const orderId = resource?.id;
            const status = resource?.status;
            const purchaseUnit = resource?.purchase_units?.[0]; // Prima (e spesso unica) unità d'acquisto
            const amount = purchaseUnit?.amount?.value;
            const currency = purchaseUnit?.amount?.currency_code;
            const payerEmail = resource?.payer?.email_address;
            const customData = purchaseUnit?.custom_id; // Es: "lessonId;userId"

            console.log(`[${invocationId}] Dati evento: orderId=${orderId}, status=${status}, customData='${customData}'`);

            let lessonId = null;
            let userId = null;
            if (customData && typeof customData === 'string') {
                const parts = customData.split(';');
                lessonId = parts[0]; // Prima parte è lessonId
                if (parts.length === 2 && parts[1]) { // Se c'è una seconda parte non vuota
                    userId = parts[1];
                }
                console.log(`[${invocationId}] Parsed custom_id: lessonId='${lessonId}', userId='${userId || 'N/A'}'`);
            } else {
                console.warn(`[${invocationId}] custom_id mancante o non è stringa.`);
            }

            // Verifica dati essenziali per questo evento
            if (orderId && status === 'APPROVED' && lessonId) {
                console.log(`[${invocationId}] Dati sufficienti. Controllo duplicati per orderId: ${orderId}`);

                // Controllo Idempotenza (evita doppi inserimenti se PayPal invia più volte)
                let existingPurchase = null;
                let checkError = null;
                try {
                    const { data: existing, error: checkErr } = await supabase
                        .from('purchases')
                        .select('id')
                        .eq('payment_provider', 'paypal')
                        .eq('payment_id', orderId)
                        .maybeSingle();
                    existingPurchase = existing;
                    checkError = checkErr;
                } catch (e) {
                    console.error(`[${invocationId}] Eccezione controllo duplicati Supabase:`, e);
                    checkError = e;
                }

                if (checkError) {
                    console.error(`[${invocationId}] Errore Supabase controllo duplicati:`, JSON.stringify(checkError));
                    // Considera se restituire 500 o 200 con errore
                    return { statusCode: 500, body: JSON.stringify({ received: true, error: 'DB check failed' }) };
                }

                if (existingPurchase) {
                    console.log(`[${invocationId}] Ordine ${orderId} GIA' PRESENTE (ID: ${existingPurchase.id}). Evento duplicato ignorato.`);
                    return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Duplicate event ignored' }) };
                }

                // Inserimento nel Database
                console.log(`[${invocationId}] Ordine ${orderId} non presente. Inserimento in 'purchases'...`);
                const purchaseRecord = {
                    user_id: userId || null, // Permetti NULL se userId non c'è
                    lesson_id: lessonId,
                    payment_provider: 'paypal',
                    payment_id: orderId,
                    status: 'completed', // Mappa 'APPROVED' a 'completed' (o 'pending' se fai capture separato)
                    amount: amount ? parseFloat(amount) : null,
                    currency: currency || null,
                    payer_email: payerEmail || null,
                    raw_payload: webhookEvent // Salva il payload per debug
                };
                console.log(`[${invocationId}] Record da inserire:`, JSON.stringify(purchaseRecord));

                try {
                    const { data: newPurchase, error: insertError } = await supabase
                        .from('purchases')
                        .insert([purchaseRecord])
                        .select();

                    if (insertError) {
                        console.error(`[${invocationId}] Errore Supabase durante l'inserimento:`, JSON.stringify(insertError));
                        console.error(`[${invocationId}] Dettaglio Errore Supabase: message='${insertError.message}', details='${insertError.details}', hint='${insertError.hint}', code='${insertError.code}'`);
                        // Rispondi 200 a PayPal per evitare retries, ma logga l'errore DB
                        return { statusCode: 200, body: JSON.stringify({ received: true, error: 'DB save failed', details: insertError.message }) };
                    }

                    console.log(`[${invocationId}] === INSERIMENTO SU SUPABASE RIUSCITO ===`);
                    console.log(`[${invocationId}] Record inserito:`, JSON.stringify(newPurchase));

                } catch (e) { // Eccezione generica durante insert
                    console.error(`[${invocationId}] Eccezione durante l'inserimento Supabase:`, e);
                    return { statusCode: 500, body: JSON.stringify({ received: true, error: 'DB insert exception', details: e.message }) };
                }

            } else { // Dati incompleti (orderId, status o lessonId mancanti)
                console.warn(`[${invocationId}] Dati evento incompleti o status non 'APPROVED'. Impossibile registrare acquisto.`);
                console.warn(`[${invocationId}] Dati ricevuti: orderId=${orderId}, status=${status}, lessonId=${lessonId}`);
                // Rispondere 200 OK comunque, perché l'evento è stato ricevuto e capito, ma non processabile.
                return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Event received but data incomplete or status invalid.' }) };
            }

        } else { // EventType non gestito
            console.log(`[${invocationId}] Tipo evento ${eventType} (${webhookEvent.id}) ricevuto ma non gestito da questo codice.`);
            // Rispondere 200 OK per confermare ricezione a PayPal
             return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Event type ignored.' }) };
        }

        // Se siamo arrivati qui, il processamento è andato a buon fine (o l'evento è stato ignorato correttamente)
        console.log(`[${invocationId}] Processamento completato con successo. Invio risposta 200 a PayPal.`);
        return { statusCode: 200, body: JSON.stringify({ received: true, message: 'Webhook processed successfully or ignored' }) };

    } catch (processingError) {
        // Errore durante il processamento DOPO la verifica (es. errore logica Supabase, parsing custom_id)
        console.error(`[${invocationId}] ERRORE durante il processamento dell'evento DOPO la verifica:`, processingError);
        console.error(`[${invocationId}] Dettagli Errore:`, processingError.message, processingError.stack);
        // È preferibile rispondere 500 per segnalare un problema interno
        return { statusCode: 500, body: JSON.stringify({ error: 'Event processing failed after verification', details: processingError.message }) };
    } finally {
        console.log(`[${invocationId}] Esecuzione terminata.`);
        console.log("------------------------------------------------------");
    }
};
// --- Fine Handler Principale ---