/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPagination } from './pagination';
import { productSearchQueryHandler } from './product';

// Products query handler
export interface ProductQueryObject extends PaginationQueryObject {
  displayName?: string;
  minRating?: string;
  price?: string;
  sortBy?: string;
}

export interface IResultProduct {
  typegooseOptions: {
    find?: any;
    sort?: any;
  };

  typeOrmOptions: {
    where?: any;
    order?: any;
    take?: number;
  };
}

// Category query handler
export interface CategoryQueryObject {
  includeProducts?: string;
  includeTop3Products?: string;
}
export interface IResultCategory {
  includeProducts: boolean;
  includeTop3Products: boolean;
}

// Pagination query handler
export interface PaginationQueryObject {
  offset?: string;
  limit?: string;
}
export interface IResultPagination {
  typegooseOptions: {
    pagination: IPagination;
  };
  typeOrmOptions: {
    skip: number;
    take: number;
  };
}

export { productSearchQueryHandler };
