'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/registrar', md_auth.ensureAuth, UserController.registrar);