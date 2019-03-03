'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    nombre: String,
    fechaIngreso: String,
    stock: Number,
    precio: Number,
    categoria: { type: Schema.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model('Products', ProductSchema);