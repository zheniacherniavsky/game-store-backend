import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { database } from './DA';
database.connect();

import { ProductRouter } from './routes/product.routes';
import { CategoryRouter } from './routes/category.routes';
import logger from './helpers/logger';
import { errorHandler } from './helpers/errorHandler';
import { AuthRouter } from './routes/auth.routes';

const port = process.env.SRV_PORT;
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

AuthRouter(router);
ProductRouter(router);
CategoryRouter(router);

app.use((req, res, next) => {
  if (res.writableEnded) {
    logger.log({
      level: 'info',
      message: `New ${req.method} request from ${req.url}. Response status is ${res.statusCode}.`,
    });
  } else {
    logger.log({
      level: 'warn',
      message: `New ${req.method} request from ${req.url}. Response status is 404, route was not found.`,
    });

    next();
  }
});

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Not found!' });
});

app.use(errorHandler);

app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `Server is running at http://localhost:${port}`,
  });
});
