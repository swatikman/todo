const bcrypt = require('bcrypt');

export const hashPassword = (password) => {
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

export const comparePasswords = (candidatePassword, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, function(err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
}