const { response } = require("express");
const Merchandise = require("../models/Merchandise");


const getMerchandises = async( req, res = response ) => {

    const merchandises = await Merchandise.find();

    if(!merchandises){
        return res.status(404).send({
            ok: false,
            msg: 'No hay Inventario'
        })
    }

    res.status(200).send({
        ok: true,
        merchandises
    })

}

const newMerchandise = async( req, res = response ) => {

    const merchandise = new Merchandise(req.body);

    try {
        
        const merchandiseGuardado = await merchandise.save();
        res.status(201).send({
            ok: true,
            merchandise: merchandiseGuardado
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
    getMerchandises,
    newMerchandise,
}
