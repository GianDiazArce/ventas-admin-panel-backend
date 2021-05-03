const { response } = require('express');
const Product = require('../models/Product');

const getProducts = async( req, res = response ) => {
    
    const products = await Product.find()
                            .populate('category', 'name')
                            .populate('supplier', 'name');
    if( !products ){
        return res.status(200).send({
            ok: true,
            msg: 'No se encontraron productos...'
        });
    }

    res.status(200).send({
        ok: true,
        products,
    });

}

const newProduct = async( req, res = response ) => {


    const product = new Product({
        name: req.body.productName,
        stock: req.body.stock,
        price_cost: req.body.price_cost,
        category: req.body.category,
        supplier: req.body.supplier
    });

    try {
        
        const productoGuardado = await product.save();
        await productoGuardado.populate('category', 'name').populate('supplier', 'name').execPopulate();
        res.json({
            ok: true,
            product: productoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    

}

const getProductById = async( req, res = response ) => {

    const productId = req.params.id;
    try {
        const product = await Product.findById( productId )
                                     .populate('category', 'name')
                                     .populate('supplier', 'name');
        if( !product ) {
            return res.status(404).send({
                ok: false,
                msg: 'No se encontro el producto que busca'
            })
        }
    
        res.status(200).send({
            ok: true,
            product,
        })
                                     
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            msg: 'Hable con el amdinistrador'
        })
    }


}

const updateProduct = async( req, res = response ) => {

    const productId = req.params.id;
    try {
        const product = await Product.findById( productId );

        if( !product ) {
            return res.status(404).send({
                ok: false,
                msg: 'No se encontro el producto que busca'
            })
        }
        const newProduct = {
            ...req.body,
            name: req.body.productName,
        }

        const productActualizado = await Product.findOneAndUpdate( { _id:productId }, newProduct, { new: true, useFindAndModify: false } );
        await productActualizado.populate('category', 'name').populate('supplier', 'name').execPopulate();
        res.status(200).send({
            ok: true,
            product: productActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            msg: 'Hable con el amdinistrador'
        })
    }
    

}

const deleteProduct = async( req, res = response) => {

    const productId = req.params.id;

    try {
        
        const product = Product.findById( productId );
        if(!product) {
            return res.status(404).send({
                ok: false,
                msg: 'No se encuentra el producto...'
            })
        }

        await Product.findByIdAndDelete( productId );

        res.status(200).send({
            ok: true,
            msg: 'El producto fue eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const calculateTop5Products = async(req, res = response) => {

    console.log('No implementada aun')
    res.status(200).send({
        ok: true,
        msg: 'No implementada aun'
    });
    // Product.aggregate(
    //     { $match   : { "order_line.ol_i_id" : 531 } } ,
    //     { $project : { "order_line" : 1, _id:0 } },
    //     { $unwind  : "$order_line"},
    //     { $match   : { "order_line.ol_i_id":{"$ne": 531 } } },
    //     { $group   : { _id : "$order_line.ol_i_id", 
    //                 totalSales : { $sum : "$order_line.ol_qty" } } },
    //     { $sort    : { totalSales : -1 } },
    //     { $limit   : 5 } 
    // )

}

const updateStock = async(req, res = response) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).send({
                ok: false,
                msg: 'No se encuentra el producto...'
            })
        }
        const newStockProduct = await Product.findOneAndUpdate({_id:productId}, {$set: {stock: (product.stock - req.body.stock)}}, { new: true, useFindAndModify: false });
        res.status(200).send({
            ok: true,
            product: newStockProduct
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const devolverStock = async(req, res = response) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).send({
                ok: false,
                msg: 'No se encuentra el producto...'
            })
        }
        const newStockProduct = await Product.findOneAndUpdate({_id:productId}, {$set: {stock: (product.stock + req.body.stock)}}, { new: true, useFindAndModify: false });
        res.status(200).send({
            ok: true,
            product: newStockProduct
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
    getProducts,
    newProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    calculateTop5Products,
    updateStock,
    devolverStock,
}