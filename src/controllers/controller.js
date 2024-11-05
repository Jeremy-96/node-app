import path from 'path';
import BaseModel from '#models/model.js';
import { generateDirname } from '#utils/files.js';

export const getHomePage = (req, res) => {
  try {
    const __dirname = generateDirname(import.meta.url);

    res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getController = async (req, res) => {
  try {
    const models = await BaseModel.find({});

    console.log(`${req.method} ${req.originalUrl}`);
    res.status(200).json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).json({ error: 'Id not found' });
    }

    const model = await BaseModel.findById(id);

    console.log(`${req.method} ${req.originalUrl}`);
    res.status(200).json(model);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const postController = async (req, res) => {
  try {
    await BaseModel.create(req.body);

    console.log(`${req.method} ${req.originalUrl}`);
    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const patchController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;

    if (!id) {
      console.log(`${req.method} ${req.originalUrl}`);
      res.status(404).json({ error: 'Id not found' });
    }

    if (!name || !content) {
      console.log(`${req.method} ${req.originalUrl}`);
      res.status(404).json({ error: 'Data not found' });
    }

    const model = await BaseModel.findByIdAndUpdate(id, { name, content });

    console.log(`${req.method} ${req.originalUrl}`);
    res.status(200).json(model);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      console.log(`${req.method} ${req.originalUrl}`);
      res.status(404).json({ error: 'Id not found' });
    }

    await BaseModel.findByIdAndDelete(id);

    console.log(`${req.method} ${req.originalUrl}`);
    res.status(204).json({ message: 'Model deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
