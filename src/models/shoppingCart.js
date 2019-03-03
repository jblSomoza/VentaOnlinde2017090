'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShoppingCart = Schema({
    producto: {type: Schema.ObjectId, ref: 'Product'},
    user: {type: Schema.ObjectId, ref: 'User'},
    stock: Number,
    subtotal: Number,
    generarFactura: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ShoppingCart', ShoppingCart);