import express from 'express';
import logger from './helpers/logger';

import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import './config/passport';

import './websocket';

import { database } from './DA';
database.connect();

import jobs from './jobs';
jobs.start();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger';

const port = process.env.SRV_PORT;
const app = express();
const router = express.Router();

// swagger setup
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

import { ProductRouter } from './routes/product.routes';
import { CategoryRouter } from './routes/category.routes';
import { AuthRouter } from './routes/auth.routes';
import { ProfileRouter } from './routes/profile.routes';
import { AdminRouter } from './routes/admin.routes';
import { BuyerRouter } from './routes/buyer.routes';
import { requestLogger, routeNotFound, errorHandler } from './middlewares';

AuthRouter(router);
ProductRouter(router);
CategoryRouter(router);
ProfileRouter(router);
BuyerRouter(router);
AdminRouter(router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// free access routes
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
