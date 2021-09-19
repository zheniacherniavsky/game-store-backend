import { Router } from 'express';
import { AccountRepository } from '../DA';
import { ResponseError } from '../helpers/errorHandler';
import { compareHashedData, hashData } from '../helpers/hash';
import { validateAccountAuthInfo, validateProfileInfo } from '../helpers/validation';

export const ProfileRouter = (router: Router): void => {
  router.put('/profile', async (req, res, next) => {
    const { username, firstName, lastName } = req.body;
    validateProfileInfo({ username, firstName, lastName });

    AccountRepository.getByUsername(username)
      .then(async (account) => {
        if (!account) next(new ResponseError(404, `Account with username ${username} was not found!`));
        else {
          account.firstName = firstName;
          account.lastName = lastName;

          const isUpdated = await AccountRepository.update(account);
          if (isUpdated) res.sendStatus(204);
          else next(new ResponseError(500, 'Something went wrong.'));
        }
      })
      .catch((err) => next(err));
  });

  router.get('/profile', async (req, res, next) => {
    const { username } = req.body;
    if (username) {
      const account = await AccountRepository.getByUsername(username);
      if (account) res.status(200).send(account);
      else next(new ResponseError(404, 'Account was not found!'));
    } else next(new ResponseError(400, 'Field username is invalid'));
  });

  router.post('/profile/password', (req, res, next) => {
    const { username, password } = req.body;
    validateAccountAuthInfo({ username, password });
    AccountRepository.getByUsername(username).then(async (account) => {
      if (!account) next(new ResponseError(404, `Account with username ${username} was not found!`));
      else {
        if (await compareHashedData(password, account.password))
          next(new ResponseError(400, 'You should use a new password!'));

        account.password = await hashData(password);

        (await AccountRepository.update(account))
          ? res.sendStatus(204)
          : next(new ResponseError(500, 'Something was wrong!'));
      }
    });
  });
};
