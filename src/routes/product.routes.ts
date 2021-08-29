import { Router, Request, Response } from 'express';
import { ProductRepository } from '../DA';
import { validateProduct } from '../helpers/validation';
import { IProduct } from '../types/types';

export const ProductRouter = (router: Router): void => {
  router.get('/products', async (req: Request, res: Response, next) => {
    const { query } = req;
    try {
      const products = await ProductRepository.getAll(query);
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }

    next();
  });

  router.post('/products/create', async (req: Request, res: Response, next) => {
    try {
      const product: IProduct = {
        displayName: req.body.displayName,
        categoriesIds: [],
        createdAt: new Date(),
        price: req.body.price,
        totalRating: req.body.totalRating,
      };
      validateProduct(product);
      const newProduct = await ProductRepository.create(product);
      res.status(200).send(newProduct);
    } catch (err) {
      next(err);
    }

    next();
  });
};
