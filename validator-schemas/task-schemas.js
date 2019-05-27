import * as yup from 'yup';

export const taskSchema = {
    body: yup.object().shape({
        _id: yup.string().strict(true).label('_id'),
        title: yup.string().min(1).strict(true).label('title'),
        done: yup.boolean().label('done')
    })
};

export const getOneSchema = {
    params: yup.object().shape({
        id: yup.string().length(24).strict(true).required().label('id')
    })
};

export const createTaskSchema = taskSchema;

export const updateTaskSchema = taskSchema;