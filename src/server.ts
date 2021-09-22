import express from 'express';
import logger from './helpers/logger';

import 'reflect-metadata';
import './config/passport';

import dotenv from 'dotenv';
dotenv.config();

import { database } from './DA';
database.connect();

const port = process.env.SRV_PORT;
const app = express();
const router = express.Router();

import { ProductRouter } from './routes/product.routes';
import { CategoryRouter } from './routes/category.routes';
import { AuthRouter } from './routes/auth.routes';
import { ProfileRouter } from './routes/profile.routes';
import { AdminRouter } from './routes/admin.routes';
import { requestLogger, routeNotFound, errorHandler } from './middlewares';

AuthRouter(router);
ProductRouter(router);
CategoryRouter(router);
ProfileRouter(router);
AdminRouter(router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);
app.use(requestLogger);
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `Server is running at http://localhost:${port}`,
  });
});
