import path from 'path';
import BaseModel from '#models/model.js';
import { generateDirname } from '#utils/files.js';
import { catchAsync } from '#utils/catchAsync.js';
import AppError from '#utils/appError.js';

export const getHomePage = (req, res) => {
  try {
    const __dirname = generateDirname(import.meta.url);

    res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getController = catchAsync(async (req, res, next) => {
  const models = await BaseModel.find({});

  res.status(200).json({
    status: 'success',
    data: {
      models,
    },
  });
});

export const getByIdController = catchAsync(async (req, res, next) => {
  const model = await BaseModel.findById(req.params.id);

  if (!model) {
    return next(new AppError(`Model with id ${req.params.id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      model,
    },
  });
});

export const postController = catchAsync(async (req, res, next) => {
  await BaseModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: null,
  });
});

export const patchController = catchAsync(async (req, res, next) => {
  const model = await BaseModel.findByIdAndUpdate(req.params.id, req.body);

  if (!model) {
    return next(new AppError(`Model with id ${req.params.id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      model,
    },
  });
});

export const deleteController = catchAsync(async (req, res, next) => {
  await BaseModel.findByIdAndDelete(req.params.id);

  if (!req.params.id) {
    return next(new AppError(`Model with id ${req.params.id} not found`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: {},
  });
});
