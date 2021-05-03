const { Schema, model } = require("mongoose");


const SaleSchema = Schema({

    sale: {
        type: Schema.Types.ObjectId,
        ref: 'Sale',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price_sale: {
        type: Number,
        required: true,
    },

},{ timestamps: true });

SaleSchema.method('toJson', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('SaleDetail', SaleSchema)