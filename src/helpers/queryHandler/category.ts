import { IResultCategory, QueryObject,  } from ".";

export const categorySearchQueryHandler = (query?: QueryObject): IResultCategory => {
  const res: IResultCategory = {
    includeProducts: false,
    includeTop3Products: false,
  };

  if(query === undefined) return res;

  if (
    query.includeProducts !== undefined &&
    (query.includeProducts === 'true' || query.includeProducts === 'false')
  ) {
    const includeProducts = Boolean(query.includeProducts);
    res.includeProducts = includeProducts;
  } 

  if (query.includeTop3Products !== undefined && query.includeTop3Products === 'top') {
    res.includeTop3Products = true;
  }

  return res;
};