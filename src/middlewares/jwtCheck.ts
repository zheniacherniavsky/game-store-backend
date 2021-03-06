import { NextFunction, Response, Request } from 'express';
import passport from 'passport';

const jwtCheck = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', { session: false })(req, res, next);
};

export default jwtCheck;
