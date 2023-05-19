const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    active: { type: Boolean, default: true },
    createdDate: Date,
    updatedDate: { type: Date, default: Date.now }
});

const model = mongoose.model('user', schema);

module.exports = model;
