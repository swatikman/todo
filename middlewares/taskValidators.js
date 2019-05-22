const yup = require('yup');
const { createValidator } = require('./../utils/middleware');

module.exports.taskValidator = createValidator({
    _id: yup.string().strict(true),
    label: yup.string().min(1).strict(true),
    done: yup.boolean()
});