'use strict'

var express = require('express');
var CarritoController = require('../controllers/cartController');
var md_Auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/agregar-carrito', md_Auth.ensureAuth, CarritoController.agregarCarrito);

module.exports = api;