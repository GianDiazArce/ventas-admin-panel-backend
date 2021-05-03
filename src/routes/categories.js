/*
    Categories Routes
    host + /api/categories
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getCategories, newCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get("/", getCategories);

// Crear Category
router.post(
    '/new-category',
    [
        // validarJWT,
        check('categoryName', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    newCategory
);

// Buscar category por Id
router.get('/:id', getCategoryById);
// Actualizar Categoria
router.put(
    '/:id', 
    [ 
        check('categoryName', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    updateCategory
);
// Eliminar Categoria
router.delete('/:id', deleteCategory);





module.exports = router;
