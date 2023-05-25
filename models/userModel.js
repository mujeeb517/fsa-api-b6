const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (val) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
            },
            message: function (item) {
                return `${item.value} is not valid email`;
            }
        }
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    active: { type: Boolean, default: true },
    role: { type: Number, default: 1 },
    createdDate: Date,
    updatedDate: { type: Date, default: Date.now }
});

const model = mongoose.model('user', schema);

module.exports = model;
