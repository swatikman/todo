import * as yup from 'yup';

export const registerSchema = {
    body: yup.object().shape({
        firstname: yup.string().min(1).strict(true).required().label('firstname'),
        lastname: yup.string().min(1).strict(true).required().label('lastname'),
        email: yup.string().email().required().label('email'),
        password: yup.string().min(6).max(20).strict(true).required().label('password')
    })
};

export const emailSchema = {
    body: yup.object().shape({
        email: yup.string().email().required().label('email'),
    })
};

export const passwordSchema = {
    body: yup.object().shape({
        password: yup.string().min(6).max(20).strict(true).required().label('password')
    })
};