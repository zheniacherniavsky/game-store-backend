import { Request, Response, NextFunction } from 'express';
import { JWTPayload } from '../config/passport';
import { ResponseError } from './errorHandler';

const buyerCheck = (req: Request, res: Response, next: NextFunction): void => {
  const { role } = req.user as JWTPayload;
  if (role !== 'buyer') next(new ResponseError(403, 'You dont have permission for this operations'));
  else next();
};

export default buyerCheck;
