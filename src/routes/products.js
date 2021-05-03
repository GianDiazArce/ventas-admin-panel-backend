/*
    Products routes
    host + /api/products
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, newProduct, getProductById, updateProduct, deleteProduct, calculateTop5Products, updateStock, devolverStock } = require('../controllers/productController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarRoleAdmin } = require('../middlewares/validar-role-admin');
const router = Router();


router.get('/', getProducts);

router.post(
    '/new-product',
    [
        validarRoleAdmin,
        check('productName', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('stock', 'El stock obligatorio y debe ser mayor que 0 ').isInt({gt:0}).not().isEmpty(),
        check('price_cost', 'El precio del producto es obligatorio').isFloat().not().isEmpty(),
        check('category', 'La categoria del producto es obligatorio').not().isEmpty(),
        check('supplier', 'El proveedor del producto es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    newProduct
);

router.get('/:id', getProductById);

router.put(
    '/:id',
    // [
    //     check('productName', 'El nombre del producto es obligatorio').not().isEmpty(),
    //     check('stock', 'El stock obligatorio y debe ser mayor que 0 ').isInt({gt:0}).not().isEmpty(),
    //     check('price_cost', 'El precio del producto es obligatorio').isFloat().not().isEmpty(),
    //     check('category', 'La categoria del producto es obligatorio').not().isEmpty(),
    // ],
    updateProduct,
);

router.delete('/:id', deleteProduct);

router.get('/top5products', calculateTop5Products);
router.post('/stock/:id', updateStock);
router.post('/devolver-stock/:id', devolverStock)


module.exports = router;


