const { Schema, model } = require("mongoose");


const ProductSchema = Schema({

    name: {
        type: String,
        required:true
    },
    stock: {
        type: Number,
        required: true
    },
    price_cost:{
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    }

},{ timestamps: true })

ProductSchema.method('toJson', function () {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model('Product', ProductSchema);

