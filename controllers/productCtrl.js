const productRepo = require('../repositories/productRepo');
const reviewRepo = require('../repositories/reviewRepo');

const isInvalid = err => err.message.indexOf('product validation failed') > -1;


const get = async (req, res) => {
    try {
        const page = +req.params.page || 1;
        const size = +req.params.limit || 10;

        let sort = req.query.sort || '';
        let direction = req.query.direction || '';
        let search = req.query.search || '';

        if (!sort) {
            sort = 'updatedDate';
            direction = 'desc';
        }

        const options = {
            page,
            size,
            sort,
            direction,
            search
        };

        const data = await productRepo.get(options);
        const count = await productRepo.getCount(options);
        const totalPages = Math.ceil(count / size);

        const response = {
            metadata: {
                pages: totalPages,
                count
            },
            data
        };
        res.status(200);
        res.json(response);
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
            const reviews = await reviewRepo.get(id);
            const avgRatingRes = await reviewRepo.getAvgRating(id);
            const avgRating = avgRatingRes && avgRatingRes.length > 0
                ? avgRatingRes[0].avgRating
                : undefined;
            const response = {
                ...product._doc,
                avgRating,
                reviews,
            };
            res.status(200);
            res.json(response);
        } else {
            res.status(404);
            res.json({ message: 'Not found' });
        }
    } catch (err) {
        console.error(err);
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
        console.log(err.message);
        if (isInvalid(err)) {
            res.status(400);
            res.json(err.errors);
        } else {
            res.status(500);
            res.json({
                message: 'Internal Server Error'
            });
        }
    }
}

async function remove(req, res) {
    const id = req.params.id;
    await productRepo.remove(id);
    res.status(204);
    res.send();
}

const update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    await productRepo.update(id, data);
    res.status(204);
    res.send();
};

const patch = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await productRepo.patch(id, data);
    res.status(204);
    res.send();
}

module.exports = { get, post, getById, remove, update, patch };

