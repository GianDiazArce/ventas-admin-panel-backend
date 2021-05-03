const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");
const { validationResult } = require('express-validator');
const { verify } = require("jsonwebtoken");


const crearUsuario = async( req, res= response ) => {

    const { email, password } = req.body;
    try {
        
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).send({
                ok: false,
                msg: 'Este email ya está en uso'
            });
        }
        let userNameLowerCase = req.body.userName.toLowerCase();
        usuario = new Usuario({
            ...req.body,
            name: userNameLowerCase
        });

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).send({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({email: email});
        
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o Contraseña incorrecta'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const revalidarToken = async(req, res = response) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(200).send({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid, name } = verify( 
            token, 
            process.env.SECRET_JWT_SEED 
        )
        return res.send({
            ok: true,
            token,
            uid,
            name
        })
        
    } catch (error) {
        // console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}


