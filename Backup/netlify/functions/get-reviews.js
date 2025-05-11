// netlify/functions/get-reviews.js
const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
     // Permette solo richieste GET
     if (event.httpMethod !== 'GET') {
         return { statusCode: 405, body: 'Method Not Allowed' };
     }

    try {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
             throw new Error("Supabase URL or Key not configured.");
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Seleziona solo le recensioni approvate, ordinate dalle più recenti
        const { data, error } = await supabase
            .from('reviews')
            .select('name, rating, comment, created_at') // Seleziona solo i campi necessari
            .eq('is_approved', true) // Filtra per recensioni approvate
            .order('created_at', { ascending: false }); // Ordina per data decrescente

        if (error) {
            console.error('Supabase Select Error:', error);
            throw error;
        }

        return {
            statusCode: 200,
            // Importante: Imposta l'header per CORS se necessario (spesso gestito da Netlify, ma buono saperlo)
            // headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(data || []) // Restituisce i dati o un array vuoto
        };

    } catch (error) {
        console.error('Error fetching reviews:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch reviews.", details: error.message })
        };
    }
};