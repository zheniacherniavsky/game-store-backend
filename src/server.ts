import express from 'express';
import logger from './helpers/logger';
import passport from 'passport';
import { errorHandler } from './middlewares/errorHandler';

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
import requestLogger from './middlewares/requestLogger';
import routeNotFound from './middlewares/routeNotFound';

// not authorizated routes
AuthRouter(router);
ProductRouter(router);
CategoryRouter(router);

// authorizated routes
router.use(passport.authenticate('jwt', { session: false }));
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
