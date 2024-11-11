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
import {
  loginController,
  signupController,
} from '#controllers/authController.js';
import { getUsersController } from '#controllers/userController.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = Router();

// AUTH
router.post('/auth/signup', baseMiddleware, signupController);
router.post('/auth/login', baseMiddleware, loginController);

// USERS
router.get('/users', getUsersController);

// BASE MODELS
router.get('/', getHomePage);
router.get('/models', authMiddleware, getController);
router.get('/models/:id', getByIdController);
router.post('/models', baseMiddleware, postController);
router.patch('/models/:id', baseMiddleware, patchController);
router.delete('/models/:id', baseMiddleware, deleteController);

export default router;
