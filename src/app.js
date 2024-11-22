import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean'
import { rateLimit } from 'express-rate-limit';
import router from '#routes/router.js';
import { errorHandler } from '#controllers/errorController.js';
import { databaseConnection } from '#utils/database.js';
import AppError from '#utils/appError.js';

dotenv.config();

const app = express();
const uri = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request',
});

databaseConnection(uri);

app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(cors());
app.use(express.json());
app.use(process.env.API_BASE_PATH, limiter, router);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});
app.use(errorHandler);

export default app;
