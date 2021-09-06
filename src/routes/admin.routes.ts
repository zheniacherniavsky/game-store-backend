import { Router } from 'express';
import { ProductRepository } from '../DA';
import { ResponseError } from '../helpers/errorHandler';
import { validateProduct } from '../helpers/validation';
import { IProduct } from '../types/types';

export const AdminRouter = (router: Router): void => {
  router.get('/products/:id', async (req, res, next) => {
    await ProductRepository.getById(req.params.id)
      .then((product) => {
        if (product === null) next(new ResponseError(404, `Product with id ${req.params.id} was not found!`));
        else res.status(200).send(product);
      })
      .catch((err) => next(err));
    next();
  });

  router.post('/products', async (req, res, next) => {
    try {
      const { displayName, price, totalRating, categoriesIds } = req.body;

      const product: IProduct = {
        displayName,
        categoriesIds: categoriesIds ? Array.from(categoriesIds) : [],
        createdAt: new Date(),
        price,
        totalRating,
      };

      validateProduct(product);
      const newProduct = await ProductRepository.create(product);
      res.status(200).send(newProduct);
    } catch (err) {
      next(err);
    }

    next();
  });

  // FIXME: update categories;
  router.patch('/products/:id', async (req, res, next) => {
    await ProductRepository.getById(req.params.id)
      .then(async (product) => {
        if (product === null) next(new ResponseError(404, `Product with id ${req.params.id} was not found!`));
        else {
          // const { displayName, price, totalRating } = req.body;
          // const updatedProduct: IProduct = {
          //   _id: product._id,
          //   displayName: displayName || product.displayName,
          //   createdAt: product.createdAt,
          //   price: price || product.price,
          //   totalRating: totalRating || product.totalRating,
          // };
          // validateProduct(updatedProduct);
          // if (await ProductRepository.update(updatedProduct)) res.status(200).send(updatedProduct);
          // else next(new ResponseError(500, `Something went wrong`));
        }
      })
      .catch((err) => next(err));
  });
};
