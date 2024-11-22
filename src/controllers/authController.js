import User from '#models/userModel.js';
import { catchAsync } from '#utils/catchAsync.js';
import AppError from '#utils/appError.js';
import createSendToken from '#utils/jwt.js';

export const signupController = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  createSendToken(user, 201, res);
});

export const loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Unauthorize - Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});
