import fs from 'fs';
import dotenv from 'dotenv';
import { databaseConnection } from '#utils/database.js';
import BaseModel from '#models/model.js';
import { generateDirname } from '#utils/files.js';

dotenv.config({ path: './.env' });

const __dirname = generateDirname(import.meta.url);
const models = JSON.parse(
  fs.readFileSync(`${__dirname}/models/models.json`, 'utf-8'),
);
const uri = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

databaseConnection(uri);

const importData = async () => {
  try {
    await BaseModel.create(models);
    console.log('Data successfully created !');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await BaseModel.deleteMany();
    console.log('Data successfully deleted !');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
};
