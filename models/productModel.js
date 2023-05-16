const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: String,
    model: String,
    price: Number,
    inStock: Boolean,
    discount: Number
});

const model = mongoose.model('product', schema);

module.exports = model;
