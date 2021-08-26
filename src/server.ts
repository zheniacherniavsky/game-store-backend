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

const port = process.env.SRV_PORT;
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

ProductRouter(router);
CategoryRouter(router);

app.use((req, res) => {
  console.log(res.writableEnded);
  logger.log({
    level: 'info',
    message: `New request from ${req.url}.`,
  });
});

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Not found!' });
});



app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
