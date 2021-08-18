import { Router, Request, Response } from 'express';
import { ProductRepository } from '../DA';
import { IProduct } from '../types/types';

export const ProductRouter = (router: Router): void => {
  router.get('/products', async (req: Request, res: Response) => {
    try {
      const products = await ProductRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send('Error getting products');
    }
  });

  router.post('/products/create', async (req: Request, res: Response) => {
    try {
      let product: IProduct = {
        displayName: req.body.displayName || 'Game without name',
        createdAt: new Date(),
        price: req.body.price || 0,
        totalRating: req.body.totalRating || 0,
      };

      product = await ProductRepository.create(product);
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(`Error creating product: ${err.message}`);
    }
  });
};
