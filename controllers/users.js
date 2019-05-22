const { User } = require('./../models/user');
const _ = require('lodash');
const { sendEmail, getCurrentUrl } = require('./../utils/email');

module.exports = {
    login: async (request, response) => {
        const user = await User.findOne({ email: request.body.email })
            
        if (!user) {
            return response.status(401).send({ error: 'Invalid email or password'});
        }

        const isMatch = await user.comparePasswords(request.body.password);
        if (isMatch) {
            const token = user.generateAuthToken();
            return response.header('token', token).send(_.pick(user, ['email', 'firstname', 'lastname']));
        } else {
            return response.status(401).send({ error: 'Invalid email or password'});
        }
    },

    register: async (request, response) => {
        const user = await User.register(request.body);
        if (user) {
            const verifyLink = `${getCurrentUrl(request)}/register/${user.accountVerifyToken}`;
            try {
                await sendEmail(
                    request.body.email,
                    'Registration', 
                    `To register proceed with this <a href="${verifyLink}">link</a>`);
                return response.send({ message: 'To verify your account the letter was sent to your email', email: user.email});
            } catch (e) {
                await user.remove();
                return response.status(500).send({ error: 'Something goes wrong, try again later'})
            }
        } else {
            response.status(409).send({ error: 'User with this email already exists'});
        }
    },

    registerVerfiy: async (request, response) => {
        const user = await User.findOne({ accountVerifyToken: request.params.token })
        if (user) {
            await user.verify();
            response.send({ message: 'Account has been succesfully verified'});
        } else {
            response.status(422).send({ error: 'Invalid token'});
        }
    },

    passwordReset: async (request, response) => {
        const user = await User.findOne({ email: request.body.email });
        if (!user) {
            return response.status(404).send({ error: 'User with this email is not exist' });
        }
        await user.savePasswordResetToken();
        
        const passwordResetTokenLink = `${getCurrentUrl(request)}/password_reset/${user.passwordResetToken}`;
    
        await sendEmail(
            request.body.email,
            'Password Reset', 
            `To reset your password proceed with this <a href="${passwordResetTokenLink}">link</a>`);
    
        response.send({ message: 'Email sent' });
    },

    passwordResetNewPassword: async (request, response) => {
        const user = await User.findOne({ passwordResetToken: request.params.token, passwordResetTokenExpires: { $gt: Date.now() } });
        if (!user) {
            return response.status(404).send({ error: 'User not found or time to reset password expired' });
        }

        user.password = request.body.password;
        await user.saveAndRemoveResetPasswordToken();
        response.send({ message: 'Password has been reset successfully '})
    },
    
    getMe: async (request, response) => {
        const user = await User.findById(request.userId, 'email firstname lastname');
        if (user) {
            return response.send(user);
        }
        response.send(404).send({ error: 'User not found' });
    },

    put: async (request, response) => {
        const newData = _.pick(request.body, ['firstname', 'lastname']);
        const user =  await User.findByIdAndUpdate(request.userId, newData, { new: true })
                .select('email firstname lastname');
        response.send(user);
    }
}