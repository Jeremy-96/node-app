import fs from 'fs';
import dotenv from 'dotenv';
import { databaseConnection } from '#utils/database.js';
import BaseModel from '#models/model.js';

dotenv.config({ path: './.env' });

const uri = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

databaseConnection(uri);

const models = JSON.parse(
  fs.readFileSync(`./src/dev-data/models/models.json`, 'utf-8'),
);

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
}
