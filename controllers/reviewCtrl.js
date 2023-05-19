const reviewRepo = require('../repositories/reviewRepo');

const post = async (req, res) => {
    try {
        const productId = req.params.id;
        req.body.productId = productId;
        await reviewRepo.create(req.body);
        res.status(201).json({ message: 'Created' })
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ message: 'Internal Server Error' });
    }
};

module.exports = { post };