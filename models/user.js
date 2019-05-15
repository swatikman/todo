const mongoose = require('mongoose');
const config = require('./../config');
const jwt = require('jsonwebtoken');
const { hashPassword, 
    comparePasswords,
    generatePasswordResetToken,
    generateAccountVerifyToken } = require('../utils/cryptography');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
        minlength: 1
    },
    lastname: {
        type: String,
        required: true,
        minlength: 1    
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    accountVerifyToken: String,
    passwordResetToken: String,
    passwordResetTokenExpires: Date
});

userSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) return next();
    try {
        user.password = await hashPassword(user.password)
        next();
    } catch (e) {
        next(e);
    }
});


userSchema.statics.register = async (user) => {
    try {
        const newUser = new User(user);
        newUser.accountVerifyToken = generateAccountVerifyToken(user._id, user.email);
        await newUser.save();
        return newUser;
    } catch (e) {
        if (e.message.indexOf('duplicate key error') !== -1) {
            return false;
        }
        throw new Error(e);
    }
}

userSchema.methods.verify = function () {
    this.isVerified = true;
    this.accountVerifyToken = undefined;
    return this.save();
}

userSchema.methods.comparePasswords = function (candidatePassword) {
    return comparePasswords(candidatePassword, this.password);
}

userSchema.methods.savePasswordResetToken = function () {
    const HOUR = 1000 * 60 * 60;
    const token = generatePasswordResetToken(this.email);
    this.passwordResetToken = token;
    this.passwordResetTokenExpires = Date.now() + HOUR; 
    return this.save();
}

userSchema.methods.saveAndRemoveResetPasswordToken = function () {
    this.passwordResetToken = null;
    this.passwordResetTokenExpires = null; 
    return this.save();
}

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.privateKey);
    return token;
};

const User = mongoose.model('User', userSchema);

module.exports.User = User;