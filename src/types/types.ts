/* eslint-disable @typescript-eslint/no-empty-interface */
import { ObjectId } from 'mongoose';
import { CategoryQueryObject, ProductQueryObject } from '../helpers/queryHandler';

// Models
export interface IProduct {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
  categoriesIds: string[];
  categories?: ICategory[];
}

export interface ICategory {
  _id?: ObjectId | string;
  displayName: string;
  products?: IProduct[];
}

export interface IAccount {
  _id?: ObjectId | string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

// Repositories
interface Repository<T> {
  getById: (id: string) => Promise<T | null>;
  create: (entity: T) => Promise<T>;
  update: (entity: T) => Promise<T | null>;
  delete: (id: string) => Promise<boolean>;
}

export interface IProductRepository extends Repository<IProduct> {
  getProductsList: (productQuery: ProductQueryObject) => Promise<IProduct[]>;
}
export interface ICategoryRepository extends Omit<Repository<ICategory>, 'getById'> {
  getById: (id: string, query: CategoryQueryObject) => Promise<ICategory | null>;

  getCategoriesList: () => Promise<ICategory[]>;
}
export interface IAccountRepository extends Repository<IAccount> {
  getByUsername: (username: string) => Promise<IAccount | null>;
}
