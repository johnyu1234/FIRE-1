const express = require('express');
const IndexController = require('../controllers/index').IndexController;

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  // Add more routes here
};