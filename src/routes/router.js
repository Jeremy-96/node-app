import { Router } from 'express';
import { baseMiddleware } from '#middlewares/middleware.js';
import {
  getHomePage,
  getController,
  getByIdController,
  postController,
  patchController,
  deleteController,
} from '#controllers/controller.js';

const router = Router();

router.get('/', getHomePage);
router.get('/models', getController);
router.get('/models/:id', getByIdController);
router.post('/models', baseMiddleware, postController);
router.patch('/models/:id', baseMiddleware, patchController);
router.delete('/models/:id', baseMiddleware, deleteController);

export default router;
