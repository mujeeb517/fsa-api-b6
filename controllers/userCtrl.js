const userRepo = require('../repositories/userRepo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        // forcefully make role User
        req.body.role = 1;
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

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbUser = await userRepo.getUserByEmail(email);
        if (!dbUser) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const result = await bcrypt.compare(password, dbUser.password);
        if (result) {
            const payload = {
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                email: dbUser.email,
                role: dbUser.role
            };
            const token = jwt.sign(payload, process.env.jwtSecret, {});
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { signup, signin };
