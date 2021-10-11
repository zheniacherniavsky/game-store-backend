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
      await ProductRepository.getById(req.params.id)
        .then(async (product) => {
          if (product === null) {
            next(new ResponseError(404, `Product with id ${req.params.id} was not found`));
          } else {
            const { rating } = req.body;
            validateRating(rating);
            if (req.user && (req.user as RequestUser).id !== undefined) {
              const ratingObj: IRating = {
                userId: (req.user as RequestUser).id,
                rating: rating,
              };

              const updatedProduct = await ProductRepository.rateProduct(req.params.id, ratingObj);
              if (updatedProduct === null) next(new ResponseError(500, `Something went wrong!`));
              res.status(200).send(updatedProduct);
            } else next(new ResponseError(403, `Unauthorized!`));
          }
        })
        .catch((err) => next(err));
      next();
    }
  );
};
