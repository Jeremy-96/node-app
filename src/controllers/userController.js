import User from '#models/userModel.js';
import AppError from '#src/utils/appError.js';
import { catchAsync } from '#utils/catchAsync.js';

const filterObject = (obj, ...properties) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (properties.includes(el)) newObject[el] = obj[el];
  });

  return newObject;
};

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
