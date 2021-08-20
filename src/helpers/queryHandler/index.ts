/* eslint-disable @typescript-eslint/no-explicit-any */
import { productSearchQueryHandler } from './product';

export interface Result {
  typegooseOptions: {
    find: any;
  };
  typeOrmOptions: any;
}

export interface QueryObject {
  displayName?: string;
  minRating?: number;
  price?: string;
}

export { productSearchQueryHandler };
