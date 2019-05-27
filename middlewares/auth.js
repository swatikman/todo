import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';

const auth = async (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401)
            .send({ error: 'Access denied! No token provided.' });
    try {
        const userId = jwt.verify(token, config.privateKey)._id;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch (exc) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

export default auth;
