import User from '../models/User';
import { pick } from 'lodash';
import { sendEmail } from '../utils/email';
import config from '../config';

export const signIn = async (request, response) => {
    const user = await User.findOne({ email: request.body.email })
        
    if (!user) {
        return response.status(401).send({ error: 'Invalid email or password'});
    }

    const isMatch = await user.comparePasswords(request.body.password);
    if (isMatch) {
        const token = user.generateAuthToken();
        return response.header('token', token).send({ message: 'You are successfully signed in'});
    } else {
        return response.status(401).send({ error: 'Invalid email or password'});
    }
};

export const signUp = async (request, response) => {
    const user = await User.register(request.body);
    if (user) {
        const verificationLink = `${config.siteUrl}/account-verify/${user.accountVerifyToken}`;
        await sendEmail(
            request.body.email,
            'Registration', 
            `To register proceed with this <a href="${verificationLink}">link</a>`);
        return response.send({ message: 'To verify your account the letter was sent to your email', email: user.email});
    } else {
        response.status(422).send({ error: 'User with this email already exists'});
    }
};

export const registerVerify = async (request, response) => {
    const user = await User.findOne({ accountVerifyToken: request.params.token })
    if (user) {
        await user.verify();
        response.send({ message: 'Account has been succesfully verified'});
    } else {
        response.status(422).send({ error: 'Invalid token'});
    }
};

export const passwordReset = async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(404).send({ error: 'User with this email is not exist' });
    }
    await user.savePasswordResetToken();
    
    const passwordResetTokenLink = `${config.siteUrl}/password-reset/${user.passwordResetToken}`;
    
    await sendEmail(
        request.body.email,
        'Password Reset', 
        `To reset your password proceed with this <a href="${passwordResetTokenLink}">link</a>`);

    response.send({ message: 'Email sent' });
};

export const passwordResetNewPassword = async (request, response) => {
    const user = await User.findOne({ passwordResetToken: request.params.token, 
            passwordResetTokenExpires: { $gt: Date.now() } });
    if (!user) {
        return response.status(404).send({ error: 'User not found or time to reset password expired' });
    }

    await user.saveAndRemoveResetPasswordToken(request.body.password);
    response.send({ message: 'Password has been reset successfully '})
};
    
export const getMe = async (request, response) => {
    const user = await User.findById(request.userId, 'email firstname lastname');
    if (user) {
        return response.send(user);
    }
    response.send(404).send({ error: 'User not found' });
};

export const update = async (request, response) => {
    const newData = pick(request.body, ['firstname', 'lastname']);
    const user =  await User
            .findByIdAndUpdate(request.userId, newData, { new: true })
            .select('email firstname lastname');
    response.send(user);
};