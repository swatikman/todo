const router = require('express-promise-router')();
const auth = require('./../middlewares/auth');
const controller = require('./../controllers/users');
const { registerValidator, 
    emailValidator, 
    passwordValidator } = require('./../middlewares/userValidators');

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