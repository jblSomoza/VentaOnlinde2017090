'use strict'

var Categorias = require('../models/category');

function categoriaMiscelanea(callback) {
    callback();
}
categoriaMiscelanea(function creaMiscelanea(res) {
    var categorias = new Categorias();
    categorias.nombreCategoria = 'Miscelanea';

    Categorias.find((err, repetir)=>{
        if(repetir && repetir.length < 1){
            categorias.save((err, categoriaGuardada)=>{
            })
        }
    })
});


module.exports = {
    categoriaMiscelanea
}