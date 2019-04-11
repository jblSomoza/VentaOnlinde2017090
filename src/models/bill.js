'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = ({
    fechaFactura: {
        type: Date,
        default: Date.now
    },
    total: Number,
    carrito: {type: [Schema.ObjectId], ref: 'ShoppingCart'}, //Se declaro un arreglo para traer varios carritos
    idUsuario: String 
});

module.exports = mongoose.model('Bills', BillSchema);