const { Schema, model } = require("mongoose");



const MerchandiseSchema = Schema({
    
    total_price: {
        type: Number,
        required: true,
    },
    // quantity: {
    //     type: Number,
    //     required: true,
    // }, // Optional
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    
},{ timestamps: true })

module.exports = model('Merchandise', MerchandiseSchema);



