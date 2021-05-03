const { response } = require('express');
const Category = require('../models/Category');

const getCategories = async( req, res = response ) => {
    const categories = await Category.find();

    if( categories ){
        res.status(200).send({
            ok: true,
            categories,
        })
    } else {
        res.status(200).send({
            ok: true,
            msg: 'No se encontro ninguna categoria, agregue una'
        })
    }

    
}

const newCategory = async(req, res = response) => {

    const category = new Category({
        name: req.body.categoryName,
    })
    
    try {
        
        const categoriaGuardada = await category.save();
        res.json({
            ok: true,
            category: categoriaGuardada
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}

const getCategoryById = async( req, res = response ) => {

    const categoryId = req.params.id;
    
    try {

        const category = await Category.findById(categoryId);

        if( !category ){
            return res.status(404).send({
                ok: false,
                msg: 'La categoria que busca no existe'
            })
        }
        res.status(200).send({
            ok: true,
            category,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// Update
const updateCategory = async(req, res = response) => {

    const categoryId = req.params.id;

    try {

        const category = Category.findById(categoryId);

        if( !category ){
            return res.status( 404 ).send({
                ok: false,
                msg: 'La categoria que quiere actualizar no existe'
            })
        }
        const newCategory = {
            // ...req.body,
            name: req.body.categoryName,
        }
        // Revisar el filtro que esta en esta funcion por si se actualizan mas
        const categoryActualizada = await Category.findOneAndUpdate( {_id:categoryId}, newCategory, {new:true, useFindAndModify: false} );

        res.status(200).send({
            ok: true,
            category: categoryActualizada,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// Delete
const deleteCategory = async(req, res=response) => {

    const categoryId = req.params.id;

    try {
        
        const category = Category.findById(categoryId);

        if( !category ){
            return res.status( 404 ).send({
                ok: false,
                msg: 'La categoria que quiere borrar no existe'
            })
        }

        await Category.findByIdAndDelete( categoryId );

        res.status(200).send({
            ok: true,
            msg: 'La categoria fue eliminada'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    getCategories,
    newCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
}





