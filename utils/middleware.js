const yup = require('yup');

module.exports.createValidator = (schema) => {
    return async (request, response, next) => {
        try {
            const shapedSchema = yup.object().shape(schema);
            await shapedSchema.validate(request.body);
            next();
        } catch (e) {
            response.status(422).send({ error: e.message });
        }
    }
}