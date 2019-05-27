import promiseRouter from 'express-promise-router';
import auth from './../middlewares/auth';
import * as userController from './../controllers/users';
import { createValidator } from '../middlewares/validator';
import { 
    signUpSchema,
    signInSchema,
    passwordResetSchema, 
    passwordResetNewPasswordSchema
} from '../validator-schemas/user-schemas';
const router = promiseRouter();

const signInValidator = createValidator(signInSchema);
const signUpValidator = createValidator(signUpSchema);
const passwordResetValidator = createValidator(passwordResetSchema);
const passwordResetNewPasswordValidator = createValidator(passwordResetNewPasswordSchema);

router.post('/sign-in', [ signInValidator ], userController.signIn);

router.post('/sign-up', [ signUpValidator ], userController.signUp);

router.post('/verify/:token', userController.registerVerify);

router.post('/password-reset', [ passwordResetValidator ], userController.passwordReset);

router.post('/password-reset/:token', [ passwordResetNewPasswordValidator ], userController.passwordResetNewPassword);

router.get('/', [ auth ], userController.getMe);

router.put('/', [ auth ], userController.update);

module.exports = router;