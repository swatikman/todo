import promiseRouter from 'express-promise-router';
import auth from '../middlewares/auth';
import * as tasksController from '../controllers/tasks';
import { taskSchema } from '../validator-schemas/task-schemas';
import { createValidator } from '../utils/middleware';
const router = promiseRouter();

const taskValidator = createValidator(taskSchema);

router.get('/', [ auth ], tasksController.get);

router.get('/:id', [ auth ], tasksController.getOne);

router.post('/', [ taskValidator, auth ], tasksController.create);

router.put('/:id', [ taskValidator, auth ], tasksController.update);

router.delete('/:id', [ auth ], tasksController.deleteTask);

module.exports = router;