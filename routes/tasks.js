import promiseRouter from 'express-promise-router';
import auth from '../middlewares/auth';
import * as tasksController from '../controllers/tasks';
import { 
    createTaskSchema,
    updateTaskSchema,
    getOneSchema 
} from '../validator-schemas/task-schemas';
import { createValidator } from '../middlewares/validator';
const router = promiseRouter();

const createTaskValidator = createValidator(createTaskSchema);
const updateTaskValidator = createValidator(updateTaskSchema);
const getOneValidator = createValidator(getOneSchema);

router.get('/', [ auth ], tasksController.get);

router.get('/:id', [ auth, getOneValidator ], tasksController.getOne);

router.post('/', [ auth, createTaskValidator ], tasksController.create);

router.put('/:id', [ auth, updateTaskValidator ], tasksController.update);

router.delete('/:id', [ auth ], tasksController.deleteTask);

module.exports = router;