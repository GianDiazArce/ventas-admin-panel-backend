const { Schema, model } = require("mongoose");



const SupplierSchema = Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false
    }



},{ timestamps: true })



module.exports = model('Supplier', SupplierSchema)

