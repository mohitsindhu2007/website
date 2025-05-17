// This is a serverless function for Netlify to handle your API requests
const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import your routes or create them here
// This is just a placeholder - you'll need to adapt this to your actual API
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// This will be where your API routes are connected
// Example: app.use('/api/products', require('../../server/routes/products'));

module.exports.handler = serverless(app);