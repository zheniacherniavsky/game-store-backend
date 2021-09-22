/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import logger from '../helpers/logger';

export class ResponseError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  status: number;
}

export const errorHandler = (err: ResponseError, req: Request, res: Response, next: NextFunction): void => {
  logger.log({
    level: 'error',
    message: err.message,
  });
  res.status(err.status || 500).json({ error: err.message });
};
