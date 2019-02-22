'use strict'

var bcrypt = require('bcrypt-nodejs');
var User  = require('../models/user');
var jwt = require('../services/jwt');

function registrar(req, res) {
    var user = new User();
    var params = req.body;

    if(req.user.rol != 'Administrador'){
        if(params.usuario && params.email && params.password){
            user.nombre = params.nombre;
            user.usuario = params.usuario;
            user.email = params.email;
            user.password = params.password;
            user.rol = params.rol;

            User.find({ $or: [
                {email: user.email.toLowerCase()},
                {email: user.email.toUpperCase()},
                {usuario: user.usuario.toLowerCase()},
                {usuario: user.usuario.toUpperCase()}
            ]}).exec((err, users)=>{
                if(err) return res.status(500).send({message: 'Error en la peticion de usuario'})

                if(users && users.length >= 1){
                    return res.status(500).send({message: 'El usuario ya existe en el sistema'});
                }else{
                    bcrypt.hash(params.password, null, null, (err, hash)=>{
                        user.password = hash;

                        user.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500).send({message: 'Error al guardar el usuario'});

                            if(usuarioGuardado){
                                res.status(200).send({user: usuarioGuardado});
                            }else{
                                res.status(404).send({message: 'No se a podido registrar al usuario'});
                            }
                        })
                    })
                }
            })
        }else{
            res.status(200).send({
                message: 'Rellene todos los campos necesarios'
            });
        }
    }   
}

module.exports ={
    registrar
}