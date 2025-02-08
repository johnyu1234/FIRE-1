const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Export the app as a serverless function
module.exports.handler = serverless(app);