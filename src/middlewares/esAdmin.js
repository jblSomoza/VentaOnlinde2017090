'use strict'

exports.esAdmin = function(req, res, next) {
    if (req.user.rol != 'Administrador') {
        return res.status(200).send({ message: 'No tienes los permisos necesarios para ejecutar esta accion, debes ser administrador' });
    }
    next();
};