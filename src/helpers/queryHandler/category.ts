import { CategoryQueryObject, IResultCategory } from '.';
import { ResponseError } from '../errorHandler';

export const categorySearchQueryHandler = (categoryQuery: CategoryQueryObject): IResultCategory => {
  const res: IResultCategory = {
    includeProducts: false,
    includeTop3Products: false,
  };

  if (categoryQuery === undefined) return res;

  if (categoryQuery.includeProducts !== undefined) {
    if (categoryQuery.includeProducts === 'true' || categoryQuery.includeProducts === 'false') {
      const includeProducts = Boolean(categoryQuery.includeProducts);
      res.includeProducts = includeProducts;
    } else throw new ResponseError(400, 'Category query handler: the query includeProducts must be a boolean');
  }

  if (categoryQuery.includeTop3Products !== undefined) {
    if (categoryQuery.includeTop3Products === 'top') res.includeTop3Products = true;
    else throw new ResponseError(400, "Category query handler: the query includeTop3Products must be: 'top'");
  }

  return res;
};
