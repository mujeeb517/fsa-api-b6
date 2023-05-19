const userRepo = require('../repositories/userRepo');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 1);
        await userRepo.signup(req.body);
        res.status(201).json({ message: 'Created' });
    } catch (err) {
        console.error(err);
        if (err.message.indexOf('duplicate key error') > -1) {
            res.status(409);
            res.json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = { signup };