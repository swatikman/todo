import mongoose from 'mongoose';
import config from '../config';
import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { hashPassword, 
    comparePasswords } from '../utils/cryptography';

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    firstname: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 1
    },
    lastname: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 1    
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 6
    },
    verifiedAt: {
        type: mongoose.Schema.Types.Date,
        default: null
    },
    accountVerifyToken: {
        type: mongoose.Schema.Types.String,
        default: null
    },
    passwordResetToken: {
        type: mongoose.Schema.Types.String,
        default: null
    },
    passwordResetTokenExpires: {
        type: mongoose.Schema.Types.Date,
        default: null
    }
});

class UserClass {
    static async register(data) {
        try {
            const user = new User(data);
            user.password = await hashPassword(data.password);
            user.accountVerifyToken = uuidv4();
            await user.save();
            return user;
        } catch (e) {
            if (e.message.indexOf('duplicate key error') !== -1) {
                return false;
            }
            throw new Error(e);
        }
    }

    comparePasswords(candidatePassword) {
        return comparePasswords(candidatePassword, this.password);
    }

    verify() {
        this.accountVerifyToken = undefined;
        this.verifiedAt = moment();
        return this.save();
    }

    savePasswordResetToken() {
        this.passwordResetToken = uuidv4();
        this.passwordResetTokenExpires = moment().add(1, 'hour'); 
        return this.save();
    }

    async saveAndRemoveResetPasswordToken(password) {
        this.password = await hashPassword(password);
        this.passwordResetToken = null;
        this.passwordResetTokenExpires = null; 
        this.verifiedAt = moment();
        return this.save();
    }

    generateAuthToken() {
        const token = jwt.sign({ _id: this._id }, config.privateKey);
        return token;
    };
}

userSchema.loadClass(UserClass);

const User = mongoose.model('User', userSchema);

export default User;