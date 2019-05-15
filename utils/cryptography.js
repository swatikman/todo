const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) reject(new Error('Password was not hashed'));
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    reject(new Error('Password was not hashed'));
                }
                resolve(hash);
            });
        });
    });
}

module.exports.comparePasswords = (candidatePassword, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, function(err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
}

module.exports.generatePasswordResetToken = (email) => {
    return crypto.createHash('sha1').update(Date.now().toString() + email).digest('hex').slice(0, 64);
}

module.exports.generateAccountVerifyToken = (id, email) => {
    return crypto.createHash('sha1').update(id + email).digest('hex').slice(0, 64);
}