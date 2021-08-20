/* eslint-disable @typescript-eslint/no-explicit-any */
import { productSearchQueryHandler } from './product';

export interface Result {
  typegooseOptions: {
    find: any;
    sort: any;
  };
  typeOrmOptions: any;
}

export interface QueryObject {
  displayName?: string;
  minRating?: number;
  price?: string;
  sortBy?: string;
}

export { productSearchQueryHandler };
