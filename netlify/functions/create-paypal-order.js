// netlify/functions/create-paypal-order.js

const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const paypal = require('@paypal/checkout-server-sdk');

// --- Inizializzazione Client ---
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    return new paypal.core.SandboxEnvironment(clientId, clientSecret); // Usa Sandbox per i test
}
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}
// --- Fine Inizializzazione ---

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Blocco di autenticazione manuale
		let userId;
		try {
			const authHeader = event.headers.authorization;
			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				throw new Error('Token non fornito o malformato.');
			}
			const token = authHeader.split(' ')[1];
		
			// Verifica il token usando la chiave segreta che abbiamo impostato su Netlify
			const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
		
			// Il 'sub' nel token è l'ID dell'utente di Supabase
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
		// Fine blocco di autenticazione manuale

        const { productCode, location, participants } = JSON.parse(event.body);
        if (!productCode) {
            return { statusCode: 400, body: JSON.stringify({ error: 'productCode mancante.' }) };
        }

        // 1. Recupera il servizio dal database
        const { data: service, error: serviceError } = await supabase
            .from('services')
            .select('*')
            .eq('product_code', productCode)
            .single();

        if (serviceError || !service) {
            throw new Error(`Servizio con codice ${productCode} non trovato.`);
        }

        // 2. Calcola il prezzo finale in base ai dati ricevuti
        let finalPrice = 0;
        let description = service.name;

        if (service.price_studio_eur && service.price_home_eur) {
            // È un servizio con opzione Studio/Domicilio
            if (location === 'studio') {
                finalPrice = service.price_studio_eur;
                description += ' - In Studio';
            } else if (location === 'home') {
                finalPrice = service.price_home_eur;
                description += ' - A Domicilio';
            } else {
                throw new Error("Opzione 'location' (studio/home) non specificata.");
            }
        } else if (service.price_per_person_eur && service.min_participants) {
            // È un servizio di gruppo
            if (!participants || participants < service.min_participants) {
                throw new Error(`Numero di partecipanti non valido. Minimo: ${service.min_participants}`);
            }
            finalPrice = service.price_per_person_eur * participants;
            description += ` (Gruppo di ${participants} persone)`;
        } else if (service.price_eur) {
            // È un servizio con prezzo fisso (es. Yoga individuale)
            finalPrice = service.price_eur;
        } else {
            throw new Error("Impossibile determinare il prezzo per il servizio.");
        }

        // Arrotonda a due decimali
        finalPrice = parseFloat(finalPrice).toFixed(2);
        
        // 3. Crea l'ordine su PayPal
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: finalPrice
                },
                description: description,
                custom_id: `${productCode};${userId};${location || ''};${participants || ''}` // Salva tutti i dati per il webhook
            }]
        });

        const order = await client().execute(request);

        return {
            statusCode: 200,
            body: JSON.stringify({ orderId: order.result.id })
        };

    } catch (error) {
        console.error("Errore durante la creazione dell'ordine PayPal:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};