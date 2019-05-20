const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');

const auth = require('./../middlewares/auth');
const { User } = require('./../models/user');
const { sendEmail, getCurrentUrl } = require('./../utils/email');

router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error: 'Invalid email or password'});
    
    const isMatch = await user.comparePasswords(req.body.password);
    if (isMatch) {
        const token = user.generateAuthToken();
        return res.header('token', token).send(pickFieldsFromUser(user));
    } else {
        return res.status(400).send({ error: 'Invalid email or password'});
    }
});

router.post('/password_reset', async (req, res) => {
    const { error } = validateEmail(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ error: 'User with this email is not exist' });
    
    try {
        await user.savePasswordResetToken();
    } catch(e) {
        return res.status(400).send({ error: 'Could not reset password. Try again later.'})
    }
    const passwordResetTokenLink = `${getCurrentUrl(req)}/password_reset/${user.passwordResetToken}`;

    await sendEmail(
        req.body.email,
        'Password Reset', 
        `To reset your password proceed with this <a href="${passwordResetTokenLink}">link</a>`);

    res.send({ message: 'Email sent', email: req.body.email });
});

router.post('/password_reset/:token', async (req, res) => {
    const { error } = validatePassword(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    
    const user = await User.findOne({ passwordResetToken: req.params.token, passwordResetTokenExpires: { $gt: Date.now() } });
    if (!user) return res.status(404).send({ error: 'User not found or time to reset password expired' });
    
    user.password = req.body.password;
    try {
        await user.saveAndRemoveResetPasswordToken();
    } catch(e) {
        return res.status(400).send({ error: 'Could not reset password. Try again later.'})
    }
    res.send({ message: 'Password has been reset successfully '})
});

router.post('/register', async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const user = await User.register(req.body);
    if (user) {
        const verifyLink = `${getCurrentUrl(req)}/register/${user.accountVerifyToken}`;
        try {
            await sendEmail(
                req.body.email,
                'Registration', 
                `To register proceed with this <a href="${verifyLink}">link</a>`);
            return res.send({ message: 'To verify your account the letter was sent to your email', email: user.email});
        } catch (e) {
            await user.remove();
            return res.status(400).send({ error: 'Something goes wrong, try again later'})
        }
    } else {
        res.status(400).send({ error: 'User with this email already exists'});
    }   
});

router.post('/register/:token', async (req, res) => {
    if (!req.params.token) return res.status(400).send({ error: 'Token was not provided' });

    const user = await User.findOne({ accountVerifyToken: req.params.token })
    if (user) {
        await user.verify();
        res.send({ message: 'Account has been succesfully verified'});
    } else {
        res.status(400).send({ error: 'Invalid token'});
    }   
});

router.get('/', auth, async (req, res) => {
    const user = await User.findOne(res.locals.id);
    if (user) return res.send(pickFieldsFromUser(user));
    
    res.send(404).send({ error: 'User not found' });
});

router.put('/', auth, async (req, res) => {
    const newUser = await User.findOneAndUpdate({ _id: res.locals.user._id }, 
        req.body, { new: true });

    return res.send(pickFieldsFromUser(newUser));
});

pickFieldsFromUser = (user) => {
    return _.pick(user, ['email', 'firstname', 'lastname']);
}

validateRegister = (user) => {
    const schema = {
        firstname: Joi.string().min(1).required(),
        lastname: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    };
    return Joi.validate(user, schema);
}

validateLogin = (user) => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    };

    return Joi.validate(user, schema);
}

validateEmail = (body) => {
    const schema = {
        email: Joi.string().email().required(),
    };
    return Joi.validate(body, schema);
}

validatePassword = (body) => {
    const schema = {
        password: Joi.string().min(6).max(20).required()
    };
    return Joi.validate(body, schema);
}

module.exports = router;