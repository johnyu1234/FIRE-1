const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Set up routes
app.get('/api', (req, res) => {
  res.send('Hello, world!');
});

// Export the app as a serverless function
module.exports.handler = serverless(app);