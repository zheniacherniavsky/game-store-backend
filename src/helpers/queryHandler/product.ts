import { IResultProduct, QueryObject } from '.';
import { Between, ILike, MoreThanOrEqual } from 'typeorm';

export const productSearchQueryHandler = (
  query?: QueryObject,
): IResultProduct => {
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

  if (query === undefined) return res;

  if (query.displayName !== undefined) {
    res.typegooseOptions.find.displayName = {
      $regex: '.*' + query.displayName + '.*',
      $options: 'i',
    };
    res.typeOrmOptions.where.displayName = ILike(`%${query.displayName}%`);
  }

  if (query.minRating !== undefined) {
    if (!isNaN(parseInt(query.minRating))) {
      res.typegooseOptions.find.totalRating = {
        $gte: query.minRating,
      };
      res.typeOrmOptions.where.totalRating = MoreThanOrEqual(query.minRating);
    } else
      throw {
        message: 'Product query handler: the query minRating must be a number',
        status: 400,
      };
  }

  if (query.price !== undefined) {
    const regex = new RegExp(/[0-9]*:[0-9]+/gm);
    const price = query.price.match(regex);
    if (price !== null) {
      const [min, max] = price[0].split(':').map((value) => parseInt(value));

      res.typegooseOptions.find.price = {
        $gte: isNaN(min) ? 0 : min,
        $lte: max,
      };
      res.typeOrmOptions.where.price = Between(isNaN(min) ? 0 : min, max);
    } else
      throw {
        message:
          "Product query handler: the query price must be in the format: 'number:number' or ':number'",
        status: 400,
      };
  }

  if (query.sortBy !== undefined) {
    const regex = new RegExp(/\w+:(desc|asc)+/gm);
    const sortOption = query.sortBy.match(regex);
    if (sortOption !== null) {
      const [option, type] = sortOption[0].split(':');
      const order = type === 'desc' ? -1 : 1;

      res.typegooseOptions.sort = [[option, order]];
      res.typeOrmOptions.order[option] = type.toUpperCase();
    } else
      throw {
        message:
          "Product query handler: the query sortBy must be in the format: 'option:(desc|asc)'. Available options: price, createdAt",
        status: 400,
      };
  }
  return res;
};
