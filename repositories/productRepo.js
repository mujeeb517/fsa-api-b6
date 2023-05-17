const Product = require('../models/productModel');

const get = () => {
    return Product.find({}, { __v: 0 });
};

const add = (data) => {
    const product = new Product(data);
    return product.save();
};

const getById = id => Product.findById(id, { __v: 0 });

function remove(id) {
    return Product.findByIdAndRemove({ _id: id });
}

const update = (id, data) => {
    return Product.findByIdAndUpdate(id, data);
};

const patch = async (id, data) => {
    const dbProduct = await Product.findById(id);

    for (let key in data) {
        dbProduct[key] = data[key];
    }

    return Product.findByIdAndUpdate(id, dbProduct);
};

module.exports = { get, add, getById, remove, update, patch };
