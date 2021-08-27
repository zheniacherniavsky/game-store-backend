import { Router } from 'express';
import { AccountRepository } from '../DA';
import { validateSignUpData } from '../helpers/validation/signUpData';

export const AuthRouter = (router: Router): void => {
  router.post('/register', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      validateSignUpData({ username, password });
      const newAccount = await AccountRepository.create({ username, password });
      res.status(200).send(newAccount);
    } catch (err) {
      next(err);
    }

    next();
  });
};
