import { Router } from 'express';
import {
  loginController,
  signupController,
} from '#controllers/authController.js';
import {
  forgotPassword,
  resetPassword,
  updatePassword,
} from '#controllers/passwordController.js';
import {
  deleteUserController,
  getUsersController,
  updateUserController,
} from '#controllers/userController.js';
import {
  getHomePage,
  getController,
  getByIdController,
  postController,
  patchController,
  deleteController,
} from '#controllers/controller.js';
import { baseMiddleware } from '#middlewares/middleware.js';
import { auth, restrictedTo } from '#middlewares/authMiddleware.js';

const router = Router();

// AUTH
router.post('/auth/signup', signupController);
router.post('/auth/login', loginController);

// PASSWORD
router.patch('/auth/password', auth, updatePassword);
router.post('/auth/password/forgot', forgotPassword);
router.patch('/auth/password/reset/:token', resetPassword);

// USERS
router.get('/users', getUsersController);
router.patch('/users', auth, updateUserController);
router.delete('/users', auth, deleteUserController);

// BASE MODELS
router.get('/', getHomePage);
router.get('/models', auth, getController);
router.get('/models/:id', getByIdController);
router.post('/models', baseMiddleware, postController);
router.patch('/models/:id', baseMiddleware, patchController);
router.delete('/models/:id', auth, restrictedTo('admin'), deleteController);

export default router;
