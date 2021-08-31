import { Router } from 'express';

export const AdminRouter = (router: Router): void => {
  router.get('/check', (req, res, next) => {
    res.sendStatus(200);
    next();
  });
};
