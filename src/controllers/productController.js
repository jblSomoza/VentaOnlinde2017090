'use strict'

var Producto = require('../models/product');

function prueba(req, res) {
    res.status(200).send({message: 'Entra'});
}

function agregarProducto(req, res) {
    var producto = new Producto();  //La variable producto contiene el modelo
    var params = req.body;

    if(params.nombre && params.stock && params.precio){
        producto.nombre = params.nombre;
        producto.fechaIngreso = params.fechaIngreso;
        producto.stock = params.stock;
        producto.precio = params.precio;
        producto.categoria = params.categoria;

        producto.save((err, productoGuardado) =>{
            if(err) return res.status(500).send({message: 'Error al guardar'});

            if(!productoGuardado) return res.status(404).send({message: 'No se ha podido guardar el producto'});

            res.status(200).send({producto: productoGuardado});
        })
    }else{
        return res.status(404).send({message: 'Rellene los campos correspondientes'});
    }
}

function editarProducto(req, res) {
    var productoId = req.params.id;
    var params = req.body;

    Producto.findByIdAndUpdate(productoId, params, {new: true}, (err, productoEditado)=>{
        if(err) return res.status(500).send({message: 'Ocurrio un error en la peticion'});

        if(!productoEditado) return res.status(404).send({message: 'No se pudo actualizar el producto'});

        res.status(200).send({producto: productoEditado});
    });
}


function borrarProducto(req, res) {
    var productoId = req.params.id;

    Producto.findByIdAndDelete(productoId, (err, productoEliminado)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(!productoEliminado) return res.status(404).send({message: 'No se pudo eliminar el producto'});

        res.status(200).send({message: 'Se elimino correctamente el producto'});
    });
}

function listarProductos(req, res) {
    Producto.find({}).populate({path: 'category'}).exec((err, listaProductos)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(!listaProductos) return res.status(404).send({message: 'No se encuentran productos registrados'});

        res.status(200).send({listaProductos});
    });  //El populate es un metodo que sirve como un join para ir a traer datos relacionados

}
module.exports = {
    agregarProducto,
    editarProducto,
    borrarProducto,
    listarProductos
}