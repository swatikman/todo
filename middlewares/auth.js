const jwt = require('jsonwebtoken');
const config = require('./../config');

module.exports = function auth (req, res, next) {
    const token = req.header('token');
    if (!token) return res.status(401)
            .send({ error: 'Access denied! No token provided.' });
    try {
        res.locals.user = jwt.verify(token, config.privateKey);
        next();
    } catch (exc) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};
