import path from 'path';
import BaseModel from '#models/model.js';
import { generateDirname } from '#utils/files.js';
import { catchAsync } from '#utils/catchAsync.js';

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
    data: models,
  });
});

export const getByIdController = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ error: 'Id not found' });
  }

  const model = await BaseModel.findById(id);

  if (!model) {
    res.status(404).json({ error: `Model with id ${id} not found` });
  }

  res.status(200).json({
    status: 'success',
    data: model,
  });
});

export const postController = catchAsync(async (req, res, next) => {
  const model = await BaseModel.create(req.body);

  res.status(201).json({
    status: 'success',
    data: model,
  });
});

export const patchController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, content } = req.body;

  if (!id) {
    res.status(404).json({ error: `Model with id ${id} not found` });
  }

  if (!name || !content) {
    res.status(404).json({ error: 'Data model is not complete' });
  }

  const model = await BaseModel.findByIdAndUpdate(id, { name, content });

  res.status(200).json({
    status: 'success',
    data: model,
  });
});

export const deleteController = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ error: `Model with id ${id} not found` });
  }

  await BaseModel.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: {},
  });
});
