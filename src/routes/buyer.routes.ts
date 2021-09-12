import { Router } from 'express';
import { ProductRepository, RatingRepository } from '../DA';
import { ResponseError } from '../helpers/errorHandler';
import { validateRating } from '../helpers/validation';
import { IRating, RequestUser } from '../types/types';

export const BuyerRouter = (router: Router): void => {
  router.post('/products/:id/rate', async (req, res, next) => {
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
              productId: req.params.id,
              rating: rating,
            };
            await RatingRepository.create(ratingObj);

            product.totalRating = await RatingRepository.getProductRating(req.params.id);
            const updatedProduct = await ProductRepository.update(product);
            res.status(200).send(updatedProduct);
          } else next(new ResponseError(403, `Unauthorized!`));
        }
      })
      .catch((err) => next(err));
    next();
  });
};
