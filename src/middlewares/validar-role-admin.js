
const { response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarRoleAdmin = async( req, res = response, next) => {

    // x-token header
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).send({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid, name } = jwt.verify( 
            token, 
            process.env.SECRET_JWT_SEED 
        )
        const {role} = await Usuario.findById(uid);
        
        if(role !== 'ROLE_ADMIN'){
            return res.status(401).send({
                ok: false,
                msg: 'Solo los administradores pueden crear cuentas'
            })
        }
        
    } catch (error) {
        // console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


    next();
}

module.exports = {
    validarRoleAdmin,
}
