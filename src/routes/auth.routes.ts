import { Router } from 'express';
import { AccountRepository } from '../DA';
import { validateAccount } from '../helpers/validation';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import randtoken from 'rand-token';
import { ResponseError } from '../helpers/errorHandler';
import { SECRET_AUTH } from '../config/secretToken';

const refreshTokens: { [key: string]: string } = {};

export const AuthRouter = (router: Router): void => {
  router.post('/register', async (req, res, next) => {
    try {
      const { username, password, firstName, lastName } = req.body;
      validateAccount({ username, password, firstName, lastName });
      const newAccount = await AccountRepository.create({
        username,
        password,
        firstName,
        lastName,
      });
      res.status(200).send(newAccount);
    } catch (err) {
      next(err);
    }

    next();
  });

  router.post('/authenticate', (req, res) => {
    const { username, password } = req.body;
    validateAccount({ username, password, firstName: null, lastName: null });
    passport.authenticate('local', { session: false }, (err, account, info) => {
      if (err || !account) {
        return res.status(info !== undefined ? 400 : 500).json({
          error: 'Something is not right!',
          info: info || err.message || 'server error',
        });
      }

      return req.login(account, { session: false }, (err) => {
        if (err) {
          return res.json({ error: err });
        }

        const token = jwt.sign(
          JSON.parse(JSON.stringify(account)),
          SECRET_AUTH,
          {
            expiresIn: 600,
          },
        );
        const refreshToken = randtoken.uid(24);
        refreshTokens[refreshToken] = account.username;
        return res.json({
          accountUsername: account.username,
          token,
          refreshToken,
        });
      });
    })(req, res);
  });

  router.post('/token', async (req, res, next) => {
    const { username, refreshToken } = req.body;

    if (!username || !refreshToken)
      next(
        new ResponseError(400, 'field username of refreshToken is invalid!'),
      );

    if (refreshTokens[refreshToken] === username) {
      await AccountRepository.getByUsername(username).then((account) => {
        if (account === null)
          return next(
            new ResponseError(
              404,
              `Account with username ${username} was not found`,
            ),
          );
        else {
          const token = jwt.sign(
            JSON.parse(JSON.stringify(account)),
            SECRET_AUTH,
            {
              expiresIn: 600,
            },
          );
          return res.json({
            accountUsername: account.username,
            token,
          });
        }
      });
    } else next(new ResponseError(401, 'Refresh token is wrong!'));
  });
};
