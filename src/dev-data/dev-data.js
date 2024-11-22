import fs from 'fs';
import dotenv from 'dotenv';
import { databaseConnection } from '#utils/database.js';
import BaseModel from '#models/model.js';
import User from '#models/userModel.js';
import { generateDirname } from '#utils/files.js';

dotenv.config({ path: './.env' });

const __dirname = generateDirname(import.meta.url);
const models = JSON.parse(
  fs.readFileSync(`${__dirname}/models/models.json`, 'utf-8'),
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/models/users.json`, 'utf-8'),
);
const uri = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

databaseConnection(uri);

const importData = async (model) => {
  try {
    if (model === 'BaseModel') {
      await BaseModel.create(models);
    } else if (model === 'User') {
      await User.create(users);
    }
    console.log(`[${model}] - Data successfully created !`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async (model) => {
  try {
    if (model === 'BaseModel') {
      await BaseModel.deleteMany();
    } else if (model === 'User') {
      await User.deleteMany();
    }
    console.log(`[${model}] - Data successfully deleted !`);
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData(process.argv[3]);
} else if (process.argv[2] === '--delete') {
  deleteData(process.argv[3]);
}
