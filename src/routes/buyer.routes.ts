import { Router } from 'express';
import WebSocket from 'ws';
import { ProductRepository, RatingRepository } from '../DA';
import { ResponseError } from '../helpers/errorHandler';
import { validateRating } from '../helpers/validation';
import { wss } from '../server';
import { IRating, RequestUser } from '../types/types';

const sendLastRatings = async (client: WebSocket) => {
  if (client.readyState === client.OPEN) {
    const lastRatings: IRating[] = await RatingRepository.getLastRatings();
    client.send(JSON.stringify(lastRatings));
  }
};

wss.on('connection', sendLastRatings);

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
              createdAt: new Date(),
            };
            await RatingRepository.create(ratingObj);

            product.totalRating = await RatingRepository.getProductRating(req.params.id);
            const updatedProduct = await ProductRepository.update(product);

            wss.clients.forEach((client) => sendLastRatings(client));

            res.status(200).send(updatedProduct);
          } else next(new ResponseError(403, `Unauthorized!`));
        }
      })
      .catch((err) => next(err));
    next();
  });
};
