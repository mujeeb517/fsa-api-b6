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

module.exports = {
    get,
    getById
};

// express
// import
// create server
// nodemon
// routing
// controllers
// routes
// GET products
// POST products
// 


