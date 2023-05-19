const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    productId: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String },
    rating: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});

const reviewModel = mongoose.model('review', schema);

module.exports = reviewModel;
