import { Router } from 'express';
import { baseMiddleware } from '#middlewares/middleware.js';
import {
  getController,
  getByIdController,
  postController,
  patchController,
  deleteController,
} from '#controllers/controller.js';

const router = Router();

router.get('/models', getController)
  .get('/models/:id', getByIdController)
  .post('/models', baseMiddleware, postController)
  .patch('/models/:id', baseMiddleware, patchController)
  .delete('/models/:id', baseMiddleware, deleteController);

export default router;
