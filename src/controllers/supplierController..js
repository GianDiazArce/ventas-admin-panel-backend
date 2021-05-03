const { response } = require("express");
const Supplier = require("../models/Supplier");



const getSuppliers = async ( req, res = response ) => {

    try {

        const suppliers = await Supplier.find();

        if( !suppliers ){
            return res.status(200).send({
                ok: false,
                msg: 'No se encontró Proveedores, debe agregar alguno para visualizarlos aquí'
            })
        }

        res.status(200).send({
            ok: true,
            suppliers,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el amdinistrador'
        })
    }

}


const newSupplier = async( req, res = response ) => {

    const supplier = new Supplier({
        // ...req.body,
        name: req.body.supplierName,
        description: req.body.description
    })

    try {
        
        const supplierGuardado = await supplier.save();
        res.status(201).send({
            ok: true,
            supplier: supplierGuardado
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const getSupplierById = async( req, res = response ) => {

    const supplierId = req.params.id;

    try {
        
        const supplier = await Supplier.findById(supplierId);
        if( !supplier ) {
            return res.status(404).send({
                ok: false,
                msg: 'No se encontro el proveedor que busca'
            })
        }
    
        res.status(200).send({
            ok: true,
            supplier,
        })

    } catch (error) {
        console.log(object);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const updateSupplier = async( req, res = response ) => {

    const supplierId = req.params.id;
    try {
        const supplier = await Supplier.findById( supplierId );

        if( !supplier ) {
            return res.status(404).send({
                ok: false,
                msg: 'No se encontro el proveedor que busca'
            })
        }
        const newSupplier = {
            // ...req.body,
            name: req.body.supplierName,
            description: req.body.description,
        }

        const supplierActualizado = await Supplier.findOneAndUpdate( {_id: supplierId}, newSupplier, { new: true, useFindAndModify: false } );

        res.status(200).send({
            ok: true,
            supplier: supplierActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            msg: 'Hable con el amdinistrador'
        })
    }
    

}

const deleteSupplier = async( req, res = response) => {

    const supplierId = req.params.id;

    try {
        
        const supplier = Supplier.findById( supplierId );
        if(!supplier) {
            return res.status(404).send({
                ok: false,
                msg: 'No se encuentra el proveedor...'
            })
        }

        await Supplier.findByIdAndDelete( supplierId );

        res.status(200).send({
            ok: true,
            msg: 'El proveedor fue eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



module.exports = {
    getSuppliers,
    newSupplier,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
}

