import { Router, Request, Response } from 'express';
import { ProductRepository } from '../DA';

export const ProductRouter = (
  router: Router,
): void => {
  router.get('/products', async (req: Request, res: Response) => {
    try {
      const products = await ProductRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send('Error getting products');
    }
  });
};
