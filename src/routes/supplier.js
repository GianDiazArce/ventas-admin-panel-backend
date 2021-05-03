

const { Router } = require('express');
const { check } = require('express-validator');
const { getSuppliers, getSupplierById, newSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController.');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRoleAdmin } = require('../middlewares/validar-role-admin');

const router = Router();



router.get('/', getSuppliers);

router.get(
    '/:id', 
    // [ 
        
    // ] ,
    getSupplierById
);

router.post(
    '/new-supplier', 
    [ 
        validarJWT,
        check('supplierName', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    newSupplier
);

router.put(
    '/:id', 
    [
        validarJWT,
        check('supplierName', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    updateSupplier
);

router.delete(
    '/:id', 
    [ 
        validarRoleAdmin,
    ] ,
    deleteSupplier
);



module.exports = router;






