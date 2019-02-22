'use strict'

var bcrypt = require('bcrypt-nodejs');
var User  = require('../models/user');
var jwt = require('../services/jwt');

function registrar(req, res) {
    var user = new User();
    var params = req.body;

    
}