import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '#routes/router.js';
import { databaseConnection } from '#utils/database.js';
import { errorHandler } from '#controllers/errorController.js';
import AppError from '#utils/appError.js';

dotenv.config();

const app = express();
const uri = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

databaseConnection(uri);

app.use(cors());
app.use(express.json());
app.use(process.env.API_BASE_PATH, router);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});
app.use(errorHandler);

export default app;
