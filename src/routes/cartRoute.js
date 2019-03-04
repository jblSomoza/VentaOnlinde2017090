'use strict'

var express = require('express');
var CarritoController = require('../controllers/cartController');
var md_Auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/agregar-carrito', md_Auth.ensureAuth, CarritoController.agregarCarrito);

api.put('/editar-carrito/:id', md_Auth.ensureAuth, CarritoController.editarCarrito);

api.delete('/borrar-carrito/:id', md_Auth.ensureAuth, CarritoController.borrarCarrito);

api.get('/listar-carritos', md_Auth.ensureAuth, CarritoController.listarCarritos);

module.exports = api;