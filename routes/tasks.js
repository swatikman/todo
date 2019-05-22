const router = require('express-promise-router')();
const yup = require('yup');
const auth = require('./../middlewares/auth');
const controller = require('./../controllers/tasks');
const { createValidator } = require('./../utils/middleware');

let taskSchema = {
    _id: yup.string().strict(true),
    label: yup.string().min(1).strict(true),
    done: yup.boolean(),
    user: yup.string().length(24).strict(true)
};

const taskValidator = createValidator(taskSchema);

router.get('/', auth, (req, res) => 
    controller.get(req, res)
);

router.get('/:id', auth, (req, res) => 
    controller.getOne(req, res)
);

router.post('/', taskValidator, auth, (req, res) =>
    controller.post(req, res)
);

router.put('/:id', taskValidator, auth, (req, res) => 
    controller.put(req, res)
);

router.delete('/:id', auth, (req, res) =>
    controller.delete(req, res)
);

module.exports = router;