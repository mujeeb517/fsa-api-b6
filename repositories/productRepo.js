const Product = require('../models/productModel');

const get = (page, size) => {
    const recordsToSkip = (page - 1) * size;
    return Product.find({}, { __v: 0 })
        .skip(recordsToSkip)
        .limit(size);
};

const getCount = () => {
    return Product.count();
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

    delete data._id;

    for (let key in data) {
        dbProduct[key] = data[key];
    }

    return Product.findByIdAndUpdate(id, dbProduct);
};

module.exports = {
    get, add, getById,
    remove, update, patch,
    getCount
};



// totalRecords: 200 db
// pagesize : 10
// pages: totalRecords/pageSize  

/*
    1 - 10
    11 - 20
    21 - 30
    ..

    91 - 100  
    
    skip: 0
    skip: 10
    skip: 20
    skip: 30
    ...
    skip: 90

   (page-1) * pageSize
   0*10 =0
   1 * 10
   2 * 10
   3 * 10
*/