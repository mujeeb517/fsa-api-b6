// in memory
const products = [
    { id: 1, brand: 'Apple', price: 1000 },
    { id: 2, brand: 'Samsung', price: 1200 },
    { id: 3, brand: 'Google', price: 800 }
];

function get(req, res) {
    res.status(200);
    res.json(products);
}

function getById(req, res) {
    const id = +req.params.id;

    const product = products.find(p => p.id === id);

    if (product) {
        res.status(200);
        res.json(product);
    } else {
        res.status(404);
        res.send("Not found");
    }

    // for (let i = 0; i < products.length; i++) {
    //     if (products[i].id === id) {
    //         res.status(200);
    //         res.json(products[i]);
    //         return;
    //     }
    // }

    // res.status(404);
    // res.send('Not found');
}

function create(req, res) {
    const payload = req.body;
    products.push(payload);

    res.status(201);
    res.json({ message: 'Created' });
}

function remove(req, res) {
    const id = +req.params.id;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            // delete
            products.splice(i, 1);

            res.status(204);
            res.send();
            return;
        }
    }

    res.status(404);
    res.send('Not found');
}

function update(req, res) {
    const id = +req.params.id;

    const product = products.find(p => p.id === id);
    if (product) {
        product.brand = req.body.brand;
        product.price = req.body.price;

        res.status(204).send();
    } else {
        res.status(404)
            .json({ message: 'Not Found' });
    }
}

// partial update
function patch(req, res) {
    const id = +req.params.id;
    const product = products.find(p => p.id === id);

    if (product) {
        for (let key in req.body) {
            product[key] = req.body[key];
        }

        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Not Found' });
    }
}

module.exports = {
    get,
    getById,
    create,
    remove,
    update,
    patch,
};

// REST API, concept
// everything is a resource
// 1. unfirom interface 
// GET: read, POST: Create, PUT: update, DELETE: delete
// safe, un-safe
// 2. client server
// 3. stateless
// 4. layered system
// 5. cacheability
// deployment
