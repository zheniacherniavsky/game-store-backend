import { Request, Response, NextFunction } from 'express';
import logger from '../helpers/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
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
};

export default requestLogger;
