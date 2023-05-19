const Review = require('../models/reviewModel');

const create = data => {
    const review = new Review(data);
    return review.save();
}

module.exports = { create };