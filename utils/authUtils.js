const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).send({ message: 'Unauthorized' });
        } else {
            const tokens = authorization.split(' ');
            const authToken = tokens[1];
            const result = await jwt.verify(authToken, process.env.jwtSecret);
            req.role = result.role;
            if (result) {
                next();
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

function authorizeAdmin(req, res, next) {
    if (req.role === 2) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = { authenticate, authorizeAdmin };