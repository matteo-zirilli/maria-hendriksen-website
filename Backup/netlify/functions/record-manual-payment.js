// netlify/functions/record-manual-payment.js

const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

// Inizializza il client di Supabase usando le variabili d'ambiente di Netlify
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event, context) => {
    // Accetta solo richieste di tipo POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // --- 1. Autenticazione dell'utente ---
    // Questo blocco si assicura che solo gli utenti loggati possano registrare un acquisto.
    let userId;
    try {
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Token non fornito o malformato.');
        }
        const token = authHeader.split(' ')[1];
        
        // Verifica il token usando la chiave segreta che abbiamo impostato su Netlify
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        
        // Il 'sub' nel token è l'ID univoco dell'utente di Supabase
        userId = decoded.sub;
        if (!userId) {
            throw new Error('ID utente non trovato nel token.');
        }

    } catch (error) {
        console.error('Errore di autenticazione:', error.message);
        return { 
            statusCode: 401, 
            body: JSON.stringify({ error: 'Utente non autenticato.' }) 
        };
    }

    // --- 2. Salvataggio dei dati dell'acquisto su Supabase ---
    try {
        // Estrai i dati inviati dal frontend
        const { productCode, amount, currency, paymentProvider } = JSON.parse(event.body);

        // Prepara l'oggetto da inserire nel database
        const purchaseData = {
            user_id: userId,
            product_code: productCode,
            status: 'pending', // Stato in attesa di conferma manuale da parte di Maria
            payment_provider: paymentProvider, // In questo caso, sarà 'bizum'
            amount: amount,
            currency: currency
        };

        // Esegui l'operazione di inserimento
        const { error: insertError } = await supabase
            .from('purchases')
            .insert(purchaseData);

        if (insertError) {
            // Se c'è un errore con il database, lancialo per bloccare l'operazione
            throw new Error(`Impossibile salvare l'acquisto: ${insertError.message}`);
        }
        
        console.log(`Pagamento 'pending' registrato per l'utente ${userId}`);

        // Se tutto va a buon fine, restituisci una risposta di successo
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error("Errore durante la registrazione del pagamento manuale:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};