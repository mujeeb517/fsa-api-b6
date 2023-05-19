const Review = require('../models/reviewModel');

const create = data => {
    const review = new Review(data);
    return review.save();
}

const get = id => Review.find({ productId: id }, { __v: 0, productId: 0 });

module.exports = { create, get };