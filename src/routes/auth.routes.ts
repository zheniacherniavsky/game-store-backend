import { Router } from 'express';
import { AccountRepository } from '../DA';
import { ResponseError } from '../helpers/errorHandler';
import { validateAccountCredentials } from '../helpers/validation';

export const AuthRouter = (router: Router): void => {
  router.post('/register', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      validateAccountCredentials({ username, password });
      const newAccount = await AccountRepository.create({ username, password });
      res.status(200).send(newAccount);
    } catch (err) {
      next(err);
    }

    next();
  });

  router.post('/authenticate', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      validateAccountCredentials({ username, password });
      const token = await AccountRepository.authenticate(username, password);
      if (token !== null) {
        res.status(200).json({ token });
      } else next(new ResponseError(404, 'Account was not found!'));
    } catch (err) {
      next(err);
    }
    next();
  });
};
