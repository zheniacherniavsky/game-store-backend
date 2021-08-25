import { IResultCategory, QueryObject } from '.';

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
    } else
      throw {
        message:
          'Category query handler: the query includeProducts must be a boolean',
        status: 400,
      };
  }

  if (query.includeTop3Products !== undefined) {
    if (query.includeTop3Products === 'top') res.includeTop3Products = true;
    else
      throw {
        message:
          "Category query handler: the query includeTop3Products must be: 'top'",
        status: 400,
      };
  }

  return res;
};
