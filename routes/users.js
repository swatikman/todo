import promiseRouter from 'express-promise-router';
import auth from './../middlewares/auth';
import * as userController from './../controllers/users';
import { createValidator } from '../utils/middleware';
import { registerSchema, 
    emailSchema, 
    passwordSchema } from '../validator-schemas/user-schemas';
const router = promiseRouter();

const emailValidator = createValidator(emailSchema);
const registerValidator = createValidator(registerSchema);
const passwordValidator = createValidator(passwordSchema);

router.post('/sign-in', [ emailValidator, passwordValidator ], userController.signIn);

router.post('/sign-up', [ registerValidator ], userController.signUp);

router.post('/verify/:token', userController.registerVerify);

router.post('/password-reset', [ emailValidator ], userController.passwordReset);

router.post('/password-reset/:token', [ passwordValidator ], userController.passwordResetNewPassword);

router.get('/', [ auth ], userController.getMe);

router.put('/', [ auth ], userController.update);

module.exports = router;