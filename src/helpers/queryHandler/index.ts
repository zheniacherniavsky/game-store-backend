/* eslint-disable @typescript-eslint/no-explicit-any */
import { productSearchQueryHandler } from './product';

export interface Result {
  typegooseOptions: {
    find?: any;
    sort?: any;
    pagination: PaginationObject;
  };
  typeOrmOptions: {
    where?: any;
    order?: any;
    skip: number;
    take?: number;
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
}

export { productSearchQueryHandler };
