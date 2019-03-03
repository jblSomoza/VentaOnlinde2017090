'use strict'

var Carrito = require('../models/shoppingCart');
var Producto = require('../models/product');

function agregarCarrito(req, res) {
    var carrito = new Carrito();
    var params = req.body;

    if(params.producto && params.stock){
        Producto.findById(params.producto, (err, productoEncontrado) =>{
            if(err) return res.status(500).send({message: 'Error en la peticion'});

            if(productoEncontrado.stock < params.stock){
                return res.status(500).send({message: 'La cantidad pedida supera al stock en la tienda'});
            }else if(params.stock < 0){
                return res.status(500).send({message: 'No se puede ingresar numero negativos a la tienda'});
            }else{
                carrito.producto = params.producto;
                carrito.user = req.user.sub;    //trae el id del usuario logueado
                carrito.stock = params.stock;
                carrito.subtotal = params.stock * productoEncontrado.precio;
                carrito.save((err, carritoGuardado)=>{
                    if(err) return res.status(500).send({message: 'Error en la peticion'});

                    if(!carritoGuardado) return res.status(500).send({message: 'No se ha guardado el carrito de compras'});

                    res.status(200).send({carrito: carritoGuardado});
                });
            }
        });
    }else{
        return res.status(404).send({message: 'Se necesita que rellene los campos necesarios'});
    }
}

module.exports = {
    agregarCarrito
}