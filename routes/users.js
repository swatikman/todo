const router = require('express-promise-router')();
const yup = require('yup');

const auth = require('./../middlewares/auth');
const controller = require('./../controllers/users');
const { createValidator } = require('./../utils/middleware');

const registerValidator = createValidator({
    firstname: yup.string().min(1).strict(true).required(),
    lastname: yup.string().min(1).strict(true).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).strict(true).required()
});

const emailValidator = createValidator({
    email: yup.string().email().required(),
});

const passwordValidator = createValidator({
    password: yup.string().min(6).max(20).strict(true).required()
})

router.post('/login', emailValidator, passwordValidator, (req, res) => {
    controller.login(req, res);
});

router.post('/register', registerValidator, (req, res) => {
    controller.register(req, res);  
});

router.post('/register/:token', (req, res) => {
    controller.registerVerfiy(req, res); 
});

router.post('/password_reset', emailValidator, (req, res) => {
    controller.passwordReset(req, res);
});

router.post('/password_reset/:token', passwordValidator, (req, res) => {
    controller.passwordResetNewPassword(req, res);
});

router.get('/', auth, (req, res) => {
    controller.getMe(req, res);
});

router.put('/', auth, (req, res) => {
    controller.put(req, res);
});

module.exports = router;