const express = require('express');
const IndexController = require('../controllers/index').IndexController;

function setRoutes(app) {
    const indexController = new IndexController();

    app.get('/', indexController.getIndex.bind(indexController));
}

module.exports = setRoutes;