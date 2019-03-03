'use strict'

var express = require('express');
var ProductController = require('../controllers/productController');
var md_Auth = require('../middlewares/authenticated');
var administrador = require('../middlewares/esAdmin');

var api = express.Router();

api.post('/agregar-producto', [md_Auth.ensureAuth, administrador.esAdmin], ProductController.agregarProducto);

api.put('/editar-producto/:id', [md_Auth.ensureAuth, administrador.esAdmin], ProductController.editarProducto);

api.delete('/borrar-producto/:id', [md_Auth.ensureAuth, administrador.esAdmin], ProductController.borrarProducto);

api.get('/listar-productos', [md_Auth.ensureAuth, administrador.esAdmin], ProductController.listarProductos);
api.get('/buscar-producto', md_Auth.ensureAuth, ProductController.buscarProducto);

module.exports = api;