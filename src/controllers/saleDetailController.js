const { response } = require("express");
const SaleDetail = require("../models/SaleDetail");


const getDatilsBySale = async(req, res = response) => {

    const saleId = req.params.id;

    try {
        const allDetails = await SaleDetail.find({sale:{_id: saleId}}).populate('sale').populate('product');
        if(!allDetails){
            return res.status(404).send({
                ok: false,
                msg: 'No se encontro resultados'
            })
        }
        res.status(200).send({
            ok: true,
            detail: allDetails
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg:'Por favor contacte a un administrador.',
        });
    }
}

const addDetailsSale = async(req, res = response) => {

    const detail = new SaleDetail({
        sale: req.body.sale,
        product: req.body.product,
        quantity: req.body.quantity,
        price_sale: req.body.price_sale
    });

    try {
        
        const nuevoDetail = await detail.save();
        await nuevoDetail.populate('sale').populate('product').execPopulate();

        res.status(200).send({
            ok: true,
            detailSale: nuevoDetail,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg:'Por favor contacte a un administrador.',
        });
    }

}

const deleteDetailsBySale = async( req, res = response ) => {
    const saleId = req.params.id;

    try {

        await SaleDetail.deleteMany({ 'sale': saleId });

        res.status(200).send({
            ok: true,
            msg: 'Los detalles fueron eliminados correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg:'Por favor contacte a un administrador.',
        });
    }
}

// Agregar middlewares validacion con token y validacion del rol en las rutas sale y saledetail


module.exports = {
    getDatilsBySale,
    addDetailsSale,
    deleteDetailsBySale,
}