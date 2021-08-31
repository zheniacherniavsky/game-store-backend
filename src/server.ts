import express from 'express';
import passport from 'passport';
import logger from './helpers/logger';
import { errorHandler, ResponseError } from './helpers/errorHandler';
import { JWTPayload } from './config/passport';

import 'reflect-metadata';
import './config/passport';

import dotenv from 'dotenv';
dotenv.config();

import { database } from './DA';
database.connect();

const port = process.env.SRV_PORT;
const app = express();
const router = express.Router();
const adminRouter = express.Router();

import { ProductRouter } from './routes/product.routes';
import { CategoryRouter } from './routes/category.routes';
import { AuthRouter } from './routes/auth.routes';
import { ProfileRouter } from './routes/profile.routes';
import { AdminRouter } from './routes/admin.routes';

AuthRouter(router);
ProfileRouter(router);
ProductRouter(router);
CategoryRouter(router);
AdminRouter(adminRouter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);
app.use(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { role } = req.user as JWTPayload;
    if (role !== 'admin') next(new ResponseError(403, 'You dont have permission for this operations'));
    else next();
  },
  adminRouter
);

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
