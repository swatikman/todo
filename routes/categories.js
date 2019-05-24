import promiseRouter from 'express-promise-router';
import auth from '../middlewares/auth';
import * as categoriesController from '../controllers/categories';
const router = promiseRouter();

router.get('/', [ auth ], categoriesController.getAccountCategories);

router.get('/:id', [ auth ], categoriesController.getOne);

router.post('/', [ auth ], categoriesController.create);

router.put('/:id', [ auth ], categoriesController.update);

router.delete('/:id', [ auth ], categoriesController.deleteCategory);

module.exports = router;