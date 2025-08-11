// netlify/functions/get-video-content.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

exports.handler = async (event, context) => {
    try {
        // Seleziona tutti i video dalla tabella, ordinandoli per data di creazione
        const { data: videos, error } = await supabase
            .from('video_lessons')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        // Restituisci la lista di video in formato JSON
        return {
            statusCode: 200,
            body: JSON.stringify(videos)
        };

    } catch (error) {
        console.error("Errore nel recuperare i video:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Impossibile recuperare i contenuti video.' })
        };
    }
};