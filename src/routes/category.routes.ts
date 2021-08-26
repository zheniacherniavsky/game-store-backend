import { Router, Request, Response } from 'express';
import { CategoryRepository } from '../DA';
import { ResponseError } from '../helpers/errorHandler';

export const CategoryRouter = (router: Router): void => {
  router.get('/categories', async (req: Request, res: Response, next) => {
    try {
      const products = await CategoryRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }

    next();
  });

  router.get('/categories/:id', async (req: Request, res: Response, next) => {
    try {
      const { query } = req;
      const category = await CategoryRepository.getById(req.params.id, query);

      if (category) 
      {
        res.status(200).send(category);
      }
      else next(new ResponseError(404, `Category with id ${req.params.id} was not found!`));
    } catch (err) {
      next(err);
    }

    next();
  });
};
