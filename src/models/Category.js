const { Schema, model } = require("mongoose");


const CategorySchema = Schema({

    name: {
        type: String,
        required: true
    }

},{ timestamps: true })

// CategorySchema.method('toJson', function () {

//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;

// })

module.exports = model('Category', CategorySchema);
