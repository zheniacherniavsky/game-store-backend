/* eslint-disable @typescript-eslint/no-explicit-any */
import { productSearchQueryHandler } from './product';

export interface IResultProduct {
  typegooseOptions: {
    find?: any;
    sort?: any;
  };

  typeOrmOptions: {
    where?: any;
    order?: any;
    take?: number;
  }
}

export interface IResultCategory {
  includeProducts: boolean;
  includeTop3Products: boolean;
}

export interface IResultPagination {
  typegooseOptions: {
    pagination: PaginationObject
  };
  typeOrmOptions: {
    skip: number;
    take: number;
  };
}

export interface PaginationObject {
  skip: number;
  limit: number;
}

export interface QueryObject {
  displayName?: string;
  minRating?: string;
  price?: string;
  sortBy?: string;
  offset?: string;
  limit?: string;
  includeProducts?: string;
  includeTop3Products?: string;
}

export { productSearchQueryHandler };
