import { Router, Request, Response } from 'express';
import { CategoryRepository } from '../DA';

export const CategoryRouter = (router: Router): void => {
  router.get('/categories', async (req: Request, res: Response) => {
    try {
      const products = await CategoryRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  });

  router.get('/categories/:id', async (req: Request, res: Response) => {
    try {
      const { query } = req;
      const category = await CategoryRepository.getById(req.params.id, query);

      if (category) res.status(200).send(category);
      else
        res.status(404).send(`Category with id ${req.params.id} was not found!`);
    } catch (err) {
      res.status(err.status || 500).json({
        error: err.message,
      });
    }
  });
};
