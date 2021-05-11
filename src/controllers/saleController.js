const { response } = require("express");
const Sale = require("../models/Sale");



const getSales = async(req, res = response) => {
    const sales = await Sale.find()
                            .populate('user', 'name')
                            .sort({'createdAt': -1});

    if( sales ) {
        res.status(200).send({
            ok: true,
            sales,
        });
    } else {
        res.status(200).send({
            ok: true,
            msg: 'No se encontro ninguna categoria, agregue una'
        })
    }
}
const getSaleById = async(req, res = response) => {
    const saleId = req.params.id;
    try {
        const sale = await Sale.findById(saleId)
                           .populate('user');

        if(!sale){
            return res.status(404).send({
                ok: false,
                msg: 'No se encontro la venta'
            });
        }
        res.status(200).send({
            ok: true,
            sale,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Contacte con un administrador'
        })
    }

    
}

const newSale = async(req, res = response) => {
    const sale = new Sale({
        total_price: req.body.total_price,
        discount: req.body.discount,
        place: req.body.place,
        user: req.body.user,
        status: req.body.status,
        gained: req.body.gained
    })


    try {
        
        const saleGuardado = await sale.save();
        await saleGuardado.populate('user').execPopulate();
        res.status(200).send({
            ok: true,
            sale: saleGuardado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Contacte con un administrador'
        })
    }
}

const changeSaleStatus = async(req, res = response) => {

    const saleId = req.params.id;
    // console.log(saleId)
    try {
        const sale = await Sale.findById(saleId);

        if(!sale) {
            return res.status(400).send({
                ok: false,
                msg: 'La venta que busca no exite',
            });
        }
        // console.log(sale)

        const saleActualizada = await Sale.findOneAndUpdate( {_id: saleId}, {$set: {status: req.body.status}}, {new:true, useFindAndModify: false} );
        await saleActualizada.populate('user').execPopulate();
        res.status(200).send({
            ok: true,
            sale: saleActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Contacte con un administrador'
        })
    }

}

const deleteSale = async(req, res = response) => {

    const saleId = req.params.id;

    try {
        const sale = Sale.findById(saleId);
        if(!sale){
            return res.status(404).send({
                ok: false,
                msg: 'No se encontro la venta'
            });
        }
        await Sale.findByIdAndDelete(saleId);
        res.status(200).send({
            ok: true,
            msg: 'La venta fue eliminada'
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
    getSales,
    newSale,
    changeSaleStatus,
    deleteSale,
    getSaleById,
}


