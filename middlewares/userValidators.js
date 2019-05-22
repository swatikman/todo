const yup = require('yup');

const { createValidator } = require('./../utils/middleware');

module.exports.registerValidator = createValidator({
    firstname: yup.string().min(1).strict(true).required(),
    lastname: yup.string().min(1).strict(true).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).strict(true).required()
});

module.exports.emailValidator = createValidator({
    email: yup.string().email().required(),
});

module.exports.passwordValidator = createValidator({
    password: yup.string().min(6).max(20).strict(true).required()
});