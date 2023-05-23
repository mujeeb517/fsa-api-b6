const Review = require('../models/reviewModel');

const create = data => {
    const review = new Review(data);
    return review.save();
}

const getAvgRating = id => {
    return Review.aggregate(
        [
            { $match: { productId: id } },
            { $group: { _id: '$productId', avgRating: { $avg: '$rating' } } },
            { $project: { _id: 0 } }
        ]
    );
};

const get = id => Review.find({ productId: id }, { __v: 0, productId: 0 });

module.exports = { create, get, getAvgRating };
