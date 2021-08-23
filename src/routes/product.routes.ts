import { Router, Request, Response } from 'express';
import { ProductRepository } from '../DA';
import { validateProduct } from '../helpers/validation';
import { IProduct } from '../types/types';

export const ProductRouter = (router: Router): void => {
  router.get('/products', async (req: Request, res: Response) => {
    const { query } = req;
    try {
      const products = await ProductRepository.getAll(query);
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send('Error getting products');
    }
  });

  router.post('/products/create', async (req: Request, res: Response) => {
    try {
      const product: IProduct = {
        displayName: req.body.displayName,
        categories: [],
        createdAt: new Date(),
        price: req.body.price,
        totalRating: req.body.totalRating,
      };
      const validateResult = validateProduct(product);
      if (validateResult.errors.length !== 0)
        res.status(400).send(validateResult.errors);
      else {
        await ProductRepository.create(product);
        res.status(200).send('Product was created');
      }
    } catch (err) {
      res.status(500).send(`Error creating product: ${err.message}`);
    }
  });
};
