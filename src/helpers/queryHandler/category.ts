import { IResultCategory, QueryObject } from '.';
import { ResponseError } from '../errorHandler';

export const categorySearchQueryHandler = (
  query?: QueryObject,
): IResultCategory => {
  const res: IResultCategory = {
    includeProducts: false,
    includeTop3Products: false,
  };

  if (query === undefined) return res;

  if (query.includeProducts !== undefined) {
    if (query.includeProducts === 'true' || query.includeProducts === 'false') {
      const includeProducts = Boolean(query.includeProducts);
      res.includeProducts = includeProducts;
    } else throw new ResponseError(
      400,
      'Category query handler: the query includeProducts must be a boolean',
    );
  }

  if (query.includeTop3Products !== undefined) {
    if (query.includeTop3Products === 'top') res.includeTop3Products = true;
    else throw new ResponseError(
      400,
      "Category query handler: the query includeTop3Products must be: 'top'",
    );
  }

  return res;
};
