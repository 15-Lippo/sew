const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'API is working!',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    netlifyContext: process.env.CONTEXT || 'unknown'
  });
});

// Solana endpoints will go here
app.get('/solana/balance', (req, res) => {
  res.json({ balance: '100 SOL' });
});

const handler = serverless(app);

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'API is working!',
      path: event.path,
      httpMethod: event.httpMethod,
      timestamp: new Date().toISOString()
    })
  };
}; 