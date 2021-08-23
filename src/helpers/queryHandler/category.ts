import { IResultCategory, QueryObject,  } from ".";

export const categorySearchQueryHandler = (query?: QueryObject): IResultCategory => {
  const res: IResultCategory = {
    typegooseOptions: {
      includeProducts: false,
      includeTop3Products: false,
    },
    typeOrmOptions: {
      relations: [],
      includeTop3Products: {},
    },
  };

  if(query === undefined) return res;

  if (
    query.includeProducts !== undefined &&
    (query.includeProducts === 'true' || query.includeProducts === 'false')
  ) {
    const includeProducts = Boolean(query.includeProducts);
    res.typegooseOptions.includeProducts = includeProducts;
    res.typeOrmOptions.relations.push('products');
  } 

  if (query.includeTop3Products !== undefined && query.includeTop3Products === 'top') {
    res.typegooseOptions.includeTop3Products = true;
    res.typeOrmOptions.includeTop3Products = true;
  }

  return res;
};