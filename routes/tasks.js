const router = require('express-promise-router')();
const auth = require('./../middlewares/auth');
const controller = require('./../controllers/tasks');
const { taskValidator } = require('./../middlewares/taskValidators');

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