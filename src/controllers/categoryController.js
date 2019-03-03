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

function crearCategoria(req, res) {
    var categoria = new Categorias();
    var params = req.body;

    if(params.nombreCategoria){
        categoria.nombreCategoria = params.nombreCategoria;

        Categorias.find({ $or: [
            {nombreCategoria: categoria.nombreCategoria.toLowerCase()},
            {nombreCategoria: categoria.nombreCategoria.toUpperCase()}
        ]}).exec((err, categories)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion'});

            if(categories && categories.length >= 1){
                return res.status(500).send({message: 'La categoria ya existe en el sistema'});
            }else{
                categoria.save((err, categoriaGuardada)=>{
                    if(err) return res.status(500).send({message: 'Error en la peticion'});

                    if(categoriaGuardada){
                        res.status(200).send({categoria: categoriaGuardada});
                    }else{
                        res.status(404).send({message: 'No se a podido agregar la categoria'});
                    }
                })
            }
        })
    }else{
        res.status(200).send({
            message: 'Rellene todos los campos necesarios'
        });
    }
}

function editarCategoria(req, res) {
    var categoriaId = req.params.id;
    var params = req.body;

    Categorias.findByIdAndUpdate(categoriaId, params, {new:true}, (err, categoriaActualizada)=>{
        if(err) return res.status(404).send({message: 'Error en la peticion'});

        if(!categoriaActualizada) return res.status.send({message: 'No se a agregado la categorias'});

        return res.status(200).send({categorias: categoriaActualizada});
    });
}

function borrarCategoria(req, res) {
    var categoriaId = req.params.id;

    //Categorias.findById

    //Producto.updateMany

    Categorias.findByIdAndDelete(categoriaId, (err, categoriaBorrado) =>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(!categoriaBorrado) return res.status(404).send({message: 'No se a podido borrar la categorias'});

        res.status(200).send({message: 'Se logro eliminar la categoria'});
    })
}

function listarCategoria(req, res){
    Categorias.find({}).exec((err, categorias)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});

        if(!categorias) return res.status(500).send({message: 'No se encuentran categorias registradas'});

        res.status(200).send({categorias});
    })
}
module.exports = {
    categoriaMiscelanea,
    crearCategoria,
    editarCategoria,
    borrarCategoria,
    listarCategoria
}