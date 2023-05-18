const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: {
        type: String,
        maxLength: [20, 'Atmost 20 chars'],
        minLength: [3, 'Atleast 3 chars'],
        required: [true, 'Brand is required']
    },
    model: { type: String, required: [true, 'Model is required'] },
    price: { type: String, required: true },
    inStock: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    createdDate: Date,
    updatedDate: { type: Date, default: Date.now }
});

const model = mongoose.model('product', schema);

module.exports = model;
