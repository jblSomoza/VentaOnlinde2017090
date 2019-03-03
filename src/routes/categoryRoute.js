'use strict'

var express = require('express');
var CategoryController = require('../controllers/categoryController');
var md_auth = require('../middlewares/authenticated');
var administrador = require('../middlewares/esAdmin'); 

var api = express.Router();

// Categoria
api.post('/agregar-categoria', [md_auth.ensureAuth, administrador.esAdmin], CategoryController.crearCategoria);

api.put('/editar-categoria/:id', [md_auth.ensureAuth, administrador.esAdmin], CategoryController.editarCategoria);

api.delete('/borrar-categoria/:id', [md_auth.ensureAuth, administrador.esAdmin], CategoryController.borrarCategoria);

api.get('/listar-categorias', [md_auth.ensureAuth, administrador.esAdmin], CategoryController.listarCategoria);

module.exports = api;