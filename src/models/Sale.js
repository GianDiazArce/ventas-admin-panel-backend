const { Schema, model } = require("mongoose");


const SaleSchema = Schema({

    total_price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
        default: 0
    },
    place: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        default: 'pending',
        enum:["cancel", "pending", "success"]
    },
    gained: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },


},{ timestamps: true });

SaleSchema.method('toJson', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Sale', SaleSchema)


