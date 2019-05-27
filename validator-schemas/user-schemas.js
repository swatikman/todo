import * as yup from 'yup';

const password = yup.string().min(6).max(20).strict(true).required().label('password');
const email = yup.string().email().required().label('email');

export const signUpSchema = {
    body: yup.object().shape({
        firstname: yup.string().min(1).strict(true).required().label('firstname'),
        lastname: yup.string().min(1).strict(true).required().label('lastname'),
        email: email,
        password: password
    })
};

export const signInSchema = {
    body: yup.object().shape({
        email: email,
        password: password
    })
};

export const passwordResetSchema = {
    body: yup.object().shape({
        email: email
    })
};

export const passwordResetNewPasswordSchema = {
    body: yup.object().shape({
        password: password
    })
};