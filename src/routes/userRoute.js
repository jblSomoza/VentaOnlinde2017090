'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var md_auth = require('../middlewares/authenticated');
var administrador = require('../middlewares/esAdmin'); 

var api = express.Router();

api.post('/agregar-administrador', UserController.registrar);
api.post('/registrar', [md_auth.ensureAuth, administrador.esAdmin] ,UserController.registrar);
api.post('/login', UserController.login);

module.exports = api;