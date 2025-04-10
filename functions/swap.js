const { Connection, PublicKey } = require('@solana/web3.js');
const { getQuote } = require('../jupiterApi');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { inputMint, outputMint, amount } = JSON.parse(event.body);
    
    // Validazione input
    if (!inputMint || !outputMint || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    // Ottieni quotazione da Jupiter
    const quote = await getQuote(inputMint, outputMint, amount);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        data: quote
      })
    };
  } catch (error) {
    console.error('Swap quote error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to get swap quote',
        details: error.message
      })
    };
  }
}; 