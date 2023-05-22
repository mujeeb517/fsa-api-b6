const User = require('../models/userModel');

const signup = (data) => {
    const user = new User(data);
    return user.save();
};

const getUserByEmail = email => {
    return User.findOne({ email: email }, {
        email: 1,
        password: 1,
        firstName: 1,
        lastName: 1,
        role: 1
    });
};

module.exports = { signup, getUserByEmail };