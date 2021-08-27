import { Router } from 'express';
import { AccountRepository } from '../DA';
import { validateAccountCredentials } from '../helpers/validation';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ResponseError } from '../helpers/errorHandler';

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

  router.post('/authenticate', (req, res, next) => {
    const { username, password } = req.body;
    validateAccountCredentials({ username, password });
    passport.authenticate('local', { session: false }, (err, account, info) => {
      if (err || !account) {
        return res.status(info !== undefined ? 400 : 500).json({
          error: 'Something is not right!',
          info: info || 'server error',
        });
      }

      return req.login(account, { session: false }, (err) => {
        if (err) {
          return res.send(err);
        }

        const token = jwt.sign(account.toJSON(), 'authtoken');
        return res.json({ account, token });
      });
    })(req, res);
  });
};
