import { Router } from 'express';

export const BuyerRouter = (router: Router): void => {
  router.post('/products/:id/rate', (req, res, next) => {
    res.end('OK');
    next();
  });
};
