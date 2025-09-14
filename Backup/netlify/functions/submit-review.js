// netlify/functions/submit-review.js
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken'); // Aggiungiamo la libreria per la verifica

// Usiamo la chiave SERVICE_ROLE per avere i permessi di scrittura
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // --- INIZIO BLOCCO DI VERIFICA ---
        // Il "buttafuori" controlla il pass
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Token non fornito.' }) };
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        const userId = decoded.sub;
        if (!userId) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Token non valido.' }) };
        }
        // --- FINE BLOCCO DI VERIFICA ---

        const { name, rating, comment } = JSON.parse(event.body);
        if (!name || !rating || !comment) {
            return { statusCode: 400, body: 'Campi richiesti mancanti.' };
        }

        const { data, error } = await supabase
            .from('reviews')
            .insert([
                // Ora includiamo anche l'ID dell'utente che ha lasciato la recensione
                { user_id: userId, name: name, rating: rating, comment: comment, is_approved: true }
            ])
            .select();

        if (error) {
            throw error;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Recensione inviata con successo!" })
        };

    } catch (error) {
        console.error('Error submitting review:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to submit review.", details: error.message })
        };
    }
};