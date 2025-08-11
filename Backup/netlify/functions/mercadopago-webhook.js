// netlify/functions/mercadopago-webhook.js
const { createClient } = require('@supabase/supabase-js');
const { MercadoPagoConfig, Payment } = require('mercadopago'); // <-- SINTASSI MODERNA (v2)

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Inizializzazione del client v2
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ARG_ACCESS_TOKEN
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        const body = JSON.parse(event.body);
        const notificationType = body.type;
        const paymentId = body.data?.id;

        if (notificationType === 'payment' && paymentId) {
            // Recupero del pagamento con la sintassi v2
            const payment = new Payment(client);
            const paymentDetails = await payment.get({ id: paymentId });

            if (!paymentDetails) throw new Error(`Info non recuperate per pagamento ${paymentId}`);

            const { status, external_reference, id: orderIdFromMP, transaction_amount, currency_id } = paymentDetails;
            const payerEmail = paymentDetails.payer?.email;

            let productCode = null;
            let userId = null;
            if (external_reference) {
                [productCode, userId] = external_reference.split(';');
            }

            if (status === 'approved' && productCode) {
                const { data: existingPurchase } = await supabase.from('purchases').select('id').eq('payment_provider', 'mercadopago').eq('payment_id', orderIdFromMP.toString()).maybeSingle();
                if (existingPurchase) {
                    console.log(`Pagamento ${orderIdFromMP} già presente. Ignorato.`);
                    return { statusCode: 200, body: 'Duplicate event ignored' };
                }

                const purchaseRecord = {
                    user_id: userId || null,
                    product_code: productCode,
                    payment_provider: 'mercadopago',
                    payment_id: orderIdFromMP.toString(),
                    status: 'completed',
                    amount: transaction_amount ? parseFloat(transaction_amount) : null,
                    currency: currency_id || null,
                    payer_email: payerEmail || null,
                    raw_payload: paymentDetails
                };

                const { error: insertError } = await supabase.from('purchases').insert([purchaseRecord]);
                if (insertError) throw new Error(`Errore DB: ${insertError.message}`);

                console.log(`=== ACQUISTO MERCADOPAGO REGISTRATO (ID: ${orderIdFromMP}) ===`);
            }
        }
    } catch (error) {
        console.error(`Errore Webhook MercadoPago:`, error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Webhook processing failed' }) };
    }

    return { statusCode: 200, body: 'Webhook received' };
};