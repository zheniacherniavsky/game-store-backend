import { QueryObject, Result } from '.';
import { Between, ILike, MoreThanOrEqual } from 'typeorm';

export const productSearchQueryHandler = (query?: QueryObject): Result => {
  const res: Result = {
    typegooseOptions: {
      find: {},
    },
    typeOrmOptions: {},
  };

  if (query === undefined) return res;

  if (query.displayName !== undefined) {
    res.typegooseOptions.find.displayName = {
      $regex: '.*' + query.displayName + '.*',
      $options: 'i',
    };
    res.typeOrmOptions.displayName = ILike(`%${query.displayName}%`);
  }

  if (query.minRating !== undefined) {
    res.typegooseOptions.find.totalRating = {
      $gte: query.minRating,
    };
    res.typeOrmOptions.totalRating = MoreThanOrEqual(query.minRating);
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
      res.typeOrmOptions.price = Between(isNaN(min) ? 0 : min, max);
    }
  }

  return res;
};
