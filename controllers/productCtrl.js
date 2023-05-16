const productRepo = require('../repositories/productRepo');

const get = async (req, res) => {
    try {
        const data = await productRepo.get();
        res.status(200);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({ message: 'Internal Server Error' });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productRepo.getById(id);
        if (product) {
            res.status(200);
            res.json(product);
        } else {
            res.status(404);
            res.json({ message: 'Not found' });
        }
    } catch (err) {
        res.status(500);
        res.json({
            message: 'Internal Server Error'
        });
    }
};

const post = async (req, res) => {
    try {
        await productRepo.add(req.body);
        res.status(201);
        res.json({ message: 'Created' });
    } catch (err) {
        res.status(500);
        res.json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = { get, post, getById };
