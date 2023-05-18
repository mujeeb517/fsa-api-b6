const Product = require('../models/productModel');


const getSortField = (sort) => {
    switch (sort.toLowerCase()) {
        case 'brand':
        case 'model':
        case 'price':
        case 'updatedDate':
        case 'createdDate':
            return sort.toLowerCase();
        default:
            return 'updatedDate';
    }
};

const getDirection = (direction) => {
    switch (direction.toLowerCase()) {
        case 'asc':
            return 1;
        case 'desc':
            return -1;
        default:
            return 1;
    }
}

const get = (options) => {
    const { page, size, sort, direction, search } = options;
    const recordsToSkip = (page - 1) * size;
    const sortField = getSortField(sort);
    const dir = getDirection(direction);

    const filter = {
        $or: [
            { brand: new RegExp(search, 'i') },
            { model: new RegExp(search, 'i') }
        ]
    };

    return Product.find(filter, { __v: 0 })
        .sort({ [sortField]: dir })
        .skip(recordsToSkip)
        .limit(size);
};

const getCount = (options) => {
    const { search } = options;
    const filter = {
        $or: [
            { brand: new RegExp(search, 'i') },
            { model: new RegExp(search, 'i') }
        ]
    };
    return Product.count(filter);
};

const add = (data) => {
    data.createdDate = new Date();
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