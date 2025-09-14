// File: /netlify/functions/get-config.js

exports.handler = async function(event, context) {
    // Questa funzione legge la variabile d'ambiente PAYPAL_CLIENT_ID
    // Netlify fornirà automaticamente il valore corretto (Sandbox o Live)
    // in base al branch (develop o main).
    return {
        statusCode: 200,
        body: JSON.stringify({
            paypalClientId: process.env.PAYPAL_CLIENT_ID
        })
    };
};