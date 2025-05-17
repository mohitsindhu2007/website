// This is a serverless function for Netlify to handle your API requests
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

// Import your routes or create them here
// This is just a placeholder - you'll need to adapt this to your actual API
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// This will be where your API routes are connected
// Example: app.use('/api/products', require('../../server/routes/products'));

module.exports.handler = serverless(app);