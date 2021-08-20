import { QueryObject, Result } from ".";
import { ILike, MoreThanOrEqual } from "typeorm";

export const productSearchQueryHandler = (query?: QueryObject): Result => {
  const res: Result = {
    typegooseOptions: {
      find: {}
    },
    typeOrmOptions: {}
  };

  if(query === undefined) return res;

  if(query.displayName !== undefined)
  {
    res.typegooseOptions.find.displayName = {
      $regex: '.*' + query.displayName + '.*',
      $options: 'i'
    };
    res.typeOrmOptions.displayName = ILike(`%${query.displayName}%`);
  }

  if(query.minRating !== undefined)
  {
    res.typegooseOptions.find.totalRating = {
      $gte: query.minRating
    };
    res.typeOrmOptions.totalRating = MoreThanOrEqual(query.minRating);
  }

  return res;
};