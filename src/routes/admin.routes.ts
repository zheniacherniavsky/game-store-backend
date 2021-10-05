import { Router } from 'express';
import { CategoryRepository, ProductRepository } from '../DA';
import { ResponseError } from '../middlewares/errorHandler';
import { validateProduct } from '../helpers/validation';
import { ICategory, IProduct } from '../types/types';
import passport from 'passport';
import adminCheck from '../middlewares/adminCheck';

export const AdminRouter = (router: Router): void => {
  router.get(
    '/admin/products/:id',
    passport.authenticate('jwt', { session: false }),
    adminCheck,
    async (req, res, next) => {
      await ProductRepository.getById(req.params.id)
        .then((product) => {
          if (product === null) next(new ResponseError(404, `Product with id ${req.params.id} was not found!`));
          else res.status(200).send(product);
        })
        .catch((err) => next(err));
      next();
    }
  );

  router.post(
    '/admin/products',
    passport.authenticate('jwt', { session: false }),
    adminCheck,
    async (req, res, next) => {
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
    }
  );

  router.patch(
    '/admin/products/:id',
    passport.authenticate('jwt', { session: false }),
    adminCheck,
    async (req, res, next) => {
      await ProductRepository.getById(req.params.id)
        .then(async (product) => {
          if (product === null) next(new ResponseError(404, `Product with id ${req.params.id} was not found!`));
          else {
            const { displayName, price, totalRating, categoriesIds } = req.body;
            const changedProduct: IProduct = {
              _id: product._id,
              displayName: displayName || product.displayName,
              categoriesIds: categoriesIds || product.categoriesIds,
              createdAt: product.createdAt,
              price: price || product.price,
              totalRating: totalRating || product.totalRating,
            };
            validateProduct(changedProduct);
            await ProductRepository.update(changedProduct).then((updatedProduct) => {
              res.status(200).send(updatedProduct);
            });
          }
        })
        .catch((err) => next(err));
    }
  );

  router.delete(
    '/admin/products/:id',
    passport.authenticate('jwt', { session: false }),
    adminCheck,
    async (req, res, next) => {
      await ProductRepository.delete(req.params.id)
        .then((result) => {
          if (result) res.sendStatus(200);
          else next(new ResponseError(404, `Product with id ${req.params.id} was not found!`));
        })
        .catch((err) => next(err));
    }
  );

  router.get(
    '/admin/categories/:id',
    passport.authenticate('jwt', { session: false }),
    adminCheck,
    async (req, res, next) => {
      await CategoryRepository.getById(req.params.id, req.query)
        .then((category) => {
          if (!category) next(new ResponseError(404, `Category with id ${req.params.id} was not found!`));

          res.status(200).send(category);
        })
        .catch((err) => next(err));
    }
  );

  router.post(
    '/admin/categories',
    passport.authenticate('jwt', { session: false }),
    adminCheck,
    async (req, res, next) => {
      const { displayName } = req.body;
      const category: ICategory = {
        displayName,
      };

      await CategoryRepository.create(category)
        .then((newCategory) => res.status(200).send(newCategory))
        .catch((err) => next(err));
    }
  );

  router.patch(
    '/admin/categories/:id',
    passport.authenticate('jwt', { session: false }),
    adminCheck,
    async (req, res, next) => {
      await CategoryRepository.getById(req.params.id, {})
        .then(async (category) => {
          if (category === null) next(new ResponseError(404, `Category with id ${req.params.id} was not found!`));
          else {
            const { displayName } = req.body;
            const changedCategory: ICategory = {
              _id: category._id,
              displayName: displayName || category.displayName,
            };
            await CategoryRepository.update(changedCategory).then((updatedCategory) => {
              res.status(200).send(updatedCategory);
            });
          }
        })
        .catch((err) => next(err));
    }
  );

  router.delete(
    '/admin/categories/:id',
    passport.authenticate('jwt', { session: false }),
    adminCheck,
    async (req, res, next) => {
      await CategoryRepository.delete(req.params.id)
        .then((result) => {
          if (result) res.sendStatus(200);
          else next(new ResponseError(404, `Category with id ${req.params.id} was not found!`));
        })
        .catch((err) => next(err));
    }
  );
};
