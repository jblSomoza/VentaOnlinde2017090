'use strict'

var Category = require('../models/category');

var inicioPrograma = function(primeraTabla) {
    callBack(primeraTabla)
}

function primeraTabla(req, res) {
    var category = new Category();

    category.nombreCategoria = 'Miscelanea';
}

module.exports = {
    inicioPrograma
}