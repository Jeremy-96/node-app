import User from '#models/userModel.js';
import AppError from '#utils/appError.js';
import filterObject from '#utils/object.js';
import { catchAsync } from '#utils/catchAsync.js';

export const getUsersController = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

export const updateUserController = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update, please use /auth/password.',
        400,
      ),
    );
  }

  const filteredBody = filterObject(req.body, 'email', 'name');
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user,
  });
});

export const deleteUserController = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
