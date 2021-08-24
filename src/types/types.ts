import { ObjectId } from 'mongoose';
import { QueryObject } from '../helpers/queryHandler';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IProduct {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
  categoriesIds?: string[];
  categories?: ICategory[];
}

export interface ICategory {
  _id?: ObjectId | string;
  displayName: string;
  products?: IProduct[]
}

interface Repository<T> {
  getAll: (query?: QueryObject) => Promise<T[]>;
  getById: (id: string, query?: QueryObject) => Promise<T | null>;
  create: (entity: T) => Promise<T>;
  update: (entity: T) => Promise<boolean>;
  delete: (entity: T) => Promise<boolean>;
}

export interface IProductRepository extends Repository<IProduct> {}
export interface ICategoryRepository extends Repository<ICategory> {}