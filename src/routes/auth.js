/*
    Auth Routes
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarRoleAdmin } = require('../middlewares/validar-role-admin');
const router = Router();




router.post(
    '/',
    [
        validarRoleAdmin,
        check('userName', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos,
    ],
    crearUsuario
);

router.post(
    '/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos,
    ], 
    loginUsuario
);

router.get('/renew', revalidarToken);


module.exports = router;


