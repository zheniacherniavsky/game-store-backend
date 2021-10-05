import { IResultProduct, ProductQueryObject } from '.';
import { Between, ILike, MoreThanOrEqual } from 'typeorm';
import { ResponseError } from '../../middlewares/errorHandler';

export const productSearchQueryHandler = (productQuery: ProductQueryObject): IResultProduct => {
  const res: IResultProduct = {
    typegooseOptions: {
      find: {},
      sort: {},
    },
    typeOrmOptions: {
      where: {},
      order: {},
    },
  };

  if (productQuery === undefined) return res;

  if (productQuery.displayName !== undefined) {
    res.typegooseOptions.find.displayName = {
      $regex: '.*' + productQuery.displayName + '.*',
      $options: 'i',
    };
    res.typeOrmOptions.where.displayName = ILike(`%${productQuery.displayName}%`);
  }

  if (productQuery.minRating !== undefined) {
    if (!isNaN(parseInt(productQuery.minRating))) {
      res.typegooseOptions.find.totalRating = {
        $gte: productQuery.minRating,
      };
      res.typeOrmOptions.where.totalRating = MoreThanOrEqual(productQuery.minRating);
    } else throw new ResponseError(400, 'Product query handler: the query minRating must be a number');
  }

  if (productQuery.price !== undefined) {
    const regex = new RegExp(/[0-9]*:[0-9]+/gm);
    const price = productQuery.price.match(regex);
    if (price !== null) {
      const [min, max] = price[0].split(':').map((value: string) => parseInt(value));

      res.typegooseOptions.find.price = {
        $gte: isNaN(min) ? 0 : min,
        $lte: max,
      };
      res.typeOrmOptions.where.price = Between(isNaN(min) ? 0 : min, max);
    } else
      throw new ResponseError(
        400,
        "Product query handler: the query price must be in the format: 'number:number' or ':number'"
      );
  }

  if (productQuery.sortBy !== undefined) {
    const regex = new RegExp(/\w+:(desc|asc)+/gm);
    const sortOption = productQuery.sortBy.match(regex);
    if (sortOption !== null) {
      const [option, type] = sortOption[0].split(':');
      const order = type === 'desc' ? -1 : 1;

      res.typegooseOptions.sort = [[option, order]];
      res.typeOrmOptions.order[option] = type.toUpperCase();
    } else
      throw new ResponseError(
        400,
        "Product query handler: the query sortBy must be in the format: 'option:(desc|asc)'. Available options: price, createdAt"
      );
  }
  return res;
};
