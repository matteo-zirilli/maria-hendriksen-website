// netlify/functions/submit-review.js
const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
    // Permette richieste solo POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, rating, comment } = JSON.parse(event.body);
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
             throw new Error("Supabase URL or Key not configured in environment variables.");
        }
        if (!name || !rating || !comment) {
            return { statusCode: 400, body: 'Missing required fields (name, rating, comment)' };
        }
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return { statusCode: 400, body: 'Rating must be a number between 1 and 5' };
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase
            .from('reviews')
            .insert([
                { name: name, rating: rating, comment: comment, is_approved: false } // is_approved è false di default
            ])
            .select(); // Restituisce i dati inseriti (opzionale)

        if (error) {
            console.error('Supabase Insert Error:', error);
            throw error;
        }

        console.log('Review submitted successfully:', data);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Review submitted successfully! Awaiting approval.", data: data })
        };

    } catch (error) {
        console.error('Error submitting review:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to submit review.", details: error.message })
        };
    }
};