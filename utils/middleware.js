import * as yup from 'yup';

export const createValidator = (schema) => {
    return async (request, response, next) => {
        try {
            const shapedSchema = yup.object().shape(schema);
            await shapedSchema.validate(request);
            next();
        } catch (e) {
            response.status(422).send({ error: e.message });
        }
    }
}