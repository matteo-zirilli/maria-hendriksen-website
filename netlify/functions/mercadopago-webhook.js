// netlify/functions/mercadopago-webhook.js
const mercadopago = require('mercadopago');
const { createClient } = require('@supabase/supabase-js');

// Configura Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configura MercadoPago
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ARG_ACCESS_TOKEN // Usa le chiavi per l'Argentina
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const body = JSON.parse(event.body);
    const notificationType = body.type;
    const paymentId = body.data?.id;

    if (notificationType === 'payment' && paymentId) {
        try {
            // 1. Ottieni i dettagli completi del pagamento da MercadoPago
            const paymentInfo = await mercadopago.payment.findById(paymentId);
            if (!paymentInfo || !paymentInfo.body) {
                throw new Error(`Impossibile recuperare info per il pagamento ${paymentId}`);
            }
            const paymentDetails = paymentInfo.body;

            const status = paymentDetails.status;
            const externalReference = paymentDetails.external_reference;
            const orderIdFromMP = paymentDetails.id.toString();

            // 2. Estrai productCode e userId da external_reference
            let productCode = null;
            let userId = null;
            if (externalReference && typeof externalReference === 'string') {
                const parts = externalReference.split(';');
                productCode = parts[0];
                if (parts.length === 2 && parts[1]) {
                    userId = parts[1];
                }
            }

            // 3. Processa solo se il pagamento è approvato e abbiamo i dati
            if (status === 'approved' && productCode) {
                // Controllo per evitare doppi inserimenti
                const { data: existingPurchase } = await supabase
                    .from('purchases')
                    .select('id')
                    .eq('payment_provider', 'mercadopago')
                    .eq('payment_id', orderIdFromMP)
                    .maybeSingle();

                if (existingPurchase) {
                    console.log(`Pagamento ${orderIdFromMP} già presente. Evento duplicato ignorato.`);
                    return { statusCode: 200, body: 'Duplicate event ignored' };
                }

                // 4. Inserimento nel Database
                const purchaseRecord = {
                    user_id: userId || null,
                    product_code: productCode, // <-- MODIFICA CHIAVE
                    payment_provider: 'mercadopago',
                    payment_id: orderIdFromMP,
                    status: 'completed',
                    amount: paymentDetails.transaction_amount ? parseFloat(paymentDetails.transaction_amount) : null,
                    currency: paymentDetails.currency_id || null,
                    payer_email: paymentDetails.payer?.email || null,
                    raw_payload: paymentDetails
                };

                const { error: insertError } = await supabase
                    .from('purchases')
                    .insert([purchaseRecord]);

                if (insertError) {
                    throw new Error(`Errore Supabase durante l'inserimento: ${insertError.message}`);
                }
                
                console.log(`=== INSERIMENTO MERCADOPAGO SU SUPABASE RIUSCITO (ID: ${orderIdFromMP}) ===`);
            }
        } catch (error) {
            console.error(`Errore durante il processamento del webhook MercadoPago:`, error);
            return { statusCode: 500, body: JSON.stringify({ error: 'Webhook processing failed' }) };
        }
    }

    // Rispondi 200 OK a MercadoPago per confermare la ricezione della notifica
    return { statusCode: 200, body: 'Webhook received' };
};