// netlify/functions/capture-paypal-order.js

const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const paypal = require('@paypal/checkout-server-sdk');

// Inizializzazione Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // 1. Autenticazione manuale dell'utente
    let userId;
    try {
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Token non fornito.');
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET); // Nota: assicurati che la variabile in Netlify si chiami SUPABASE_JWT_SECRET
        userId = decoded.sub;
        if (!userId) throw new Error('ID utente non trovato nel token.');
    } catch (error) {
        console.error('Errore di autenticazione:', error.message);
        return { statusCode: 401, body: JSON.stringify({ error: 'Utente non autenticato.' }) };
    }

    // 2. Cattura dell'ordine su PayPal
    try {
        const { orderID, productCode } = JSON.parse(event.body);
        if (!orderID || !productCode) {
            return { statusCode: 400, body: JSON.stringify({ error: 'orderID o productCode mancante.' }) };
        }

        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});
        const capture = await client().execute(request);

        const captureId = capture.result.purchase_units[0].payments.captures[0].id;
        const status = capture.result.status;

        if (status !== 'COMPLETED') {
            throw new Error(`Stato pagamento non completato: ${status}`);
        }

        // 3. Registrazione dell'acquisto su Supabase
		const purchaseUnit = capture.result.purchase_units[0];
		const captureDetails = purchaseUnit.payments.captures[0];
		
		const purchaseData = {
			user_id: userId,
			product_code: productCode,
			payment_id: captureDetails.id,
			status: 'completed',
			payment_provider: 'paypal',
			amount: parseFloat(captureDetails.amount.value),
			currency: captureDetails.amount.currency_code,
			payer_email: capture.result.payer.email_address,
			raw_payload: capture.result
		};
		
		const { error: insertError } = await supabase
			.from('purchases')
			.insert(purchaseData);
		
		if (insertError) {
			console.error("Errore salvataggio su Supabase:", insertError);
			// Non blocchiamo l'utente, ma logghiamo l'errore.
		} else {
			console.log("Acquisto salvato con successo su Supabase per l'utente:", userId);
		}

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, captureId: captureId })
        };

    } catch (error) {
        console.error("Errore durante la cattura dell'ordine o salvataggio:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};