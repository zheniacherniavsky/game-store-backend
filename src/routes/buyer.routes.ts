import { Router } from 'express';
import passport from 'passport';
import { ProductRepository } from '../DA';
import { validateRating } from '../helpers/validation';
import buyerCheck from '../middlewares/buyerCheck';
import { ResponseError } from '../middlewares/errorHandler';
import { IRating, RequestUser } from '../types/types';

export const BuyerRouter = (router: Router): void => {
  router.post(
    '/products/:id/rate',
    passport.authenticate('jwt', { session: false }),
    buyerCheck,
    async (req, res, next) => {
      const product = await ProductRepository.getById(req.params.id);
      if (product === null) {
        next(new ResponseError(404, `Product with id ${req.params.id} was not found`));
      }

      const { rating } = req.body;
      validateRating(rating);

      const ratingObj: IRating = {
        userId: (req.user as RequestUser).id,
        createdAt: new Date(),
        rating: rating,
      };
      const updatedProduct = await ProductRepository.rateProduct(req.params.id, ratingObj);
      if (updatedProduct === null) next(new ResponseError(500, `Something went wrong!`));

      res.status(200).send(updatedProduct);
      next();
    }
  );
};
