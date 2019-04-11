'use strict'

var Factura = require('../models/bill');
var Carrito = require('../models/shoppingCart');
var Producto = require('../models/product');

function generarFactura(req, res) {
    var factura = new Factura();
    var params = req.body;
    var total = 0
    
    var idUsuario = req.user.sub;

    Carrito.find({ $and:[
        {generarFactura: false},
        {user: req.user.sub}
    ]}).exec((err, datosCarrito) => {
        factura.carrito = datosCarrito; //Aqui llenamos el arreglo del modelo de factura

        for (let x = 0; x < datosCarrito.length; x++) {
            total += datosCarrito[x].subtotal;
            datosCarrito[x].generarFactura = true;

            Carrito.findByIdAndUpdate(datosCarrito[x]._id, {generarFactura : true}, (err, k) => {
                //Actualizamos el carrito
            });

            Producto.findById(datosCarrito[x].producto, (err, productoEncontrado) => {
                productoEncontrado.stock = productoEncontrado.stock - datosCarrito[x].stock;
                Producto.findByIdAndUpdate(datosCarrito[x].producto, productoEncontrado, (err, actualizado) => {})
            });            
        }
        factura.total = total;

        factura.idUsuario = req.user.sub;

        factura.save((err, facturaGuardada) => {
            if(err) return res.status(500).send({message: 'Error en la peticion'});

            if(!facturaGuardada) return res.status(404).send({message: 'No se a guardado la factura'});

            res.status(200).send({factura: facturaGuardada});
        })
    })
}

function borrarFactura(req, res) {
    var facturaId = req.params.id;

    Factura.findByIdAndDelete(facturaId, (err, facturaBorrada) =>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(!facturaBorrada) return res.status(404).send({message: 'No se a podido borrar la factura'});

        res.status(200).send({message: 'Se logro eliminar la factura'});
    })
}

function listarFacturas(req, res){

    Factura.find({idUsuario : req.user.sub}).exec((err, facturas)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(!facturas) return res.status(500).send({message: 'No se encuentran facturas registradas'});

        res.status(200).send({facturas});
    })

}

module.exports = {
    generarFactura,
    borrarFactura,
    listarFacturas
}