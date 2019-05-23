import * as yup from 'yup';

export const registerSchema = {
    body: yup.object().shape({
        firstname: yup.string().min(1).strict(true).required(),
        lastname: yup.string().min(1).strict(true).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).max(20).strict(true).required()
    })
};

export const emailSchema = {
    body: yup.object().shape({
        email: yup.string().email().required(),
    })
};

export const passwordSchema = {
    body: yup.object().shape({
        password: yup.string().min(6).max(20).strict(true).required()
    })
};