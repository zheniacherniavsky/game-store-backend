import { Router, Request, Response } from 'express';
import { ProductRepository } from '../DA';

export const ProductRouter = (router: Router): void => {
  router.get('/products', async (req: Request, res: Response, next) => {
    const { query } = req;
    try {
      const products = await ProductRepository.getProductsList(query);
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }

    next();
  });
};
