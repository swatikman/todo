import * as yup from 'yup';

export const taskSchema = {
    body: yup.object().shape({
        _id: yup.string().strict(true),
        label: yup.string().min(1).strict(true),
        done: yup.boolean()
    })
};