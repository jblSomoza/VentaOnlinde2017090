'use strict'

var express = require('express');
var FacturaController = require('../controllers/billController');
var md_Auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/generar-factura', md_Auth.ensureAuth, FacturaController.generarFactura);

api.delete('/eliminar-factura/:id', md_Auth.ensureAuth, FacturaController.borrarFactura);

api.get('/listar-facturas', md_Auth.ensureAuth, FacturaController.listarFacturas);

module.exports = api;