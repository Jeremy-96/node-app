import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { catchAsync } from '#src/utils/catchAsync.js';
import AppError from '#src/utils/appError.js';
import User from '#models/userModel.js';

export const authMiddleware = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return next(new AppError('Unauthorized - You are not logged in', 401));
    }
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError('The token no longer exist', 401));
  }

  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed password ! Please loggin again.',
        401,
      ),
    );
  }

  req.user = freshUser;

  next();
});
