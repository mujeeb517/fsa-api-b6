const User = require('../models/userModel');

const signup = (data) => {
    const user = new User(data);
    return user.save();
};

module.exports = { signup };