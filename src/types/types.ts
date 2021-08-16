/* eslint-disable @typescript-eslint/no-empty-interface */
import { ObjectId } from 'mongoose';
export interface IProduct {
  displayName: string;
  categoryIds: ObjectId[] | number[];
  createdAt: Date;
  totalRating: number;
  price: number;
}

export interface ICategory {
  displayName: string;
}

export interface IProductRepository<T> {
  getAll: () => Promise<T[]>;
  create: (entity: IProduct) => Promise<T>;
}

export interface ICategoryRepository<T> {
  getAll: () => Promise<T[]>;
  create: (entity: ICategory) => Promise<T>;
}

export interface IProductTypeOrmRepository
  extends IProductRepository<IProduct> {}

export interface IProductTypegooseRepository
  extends IProductRepository<IProduct> {}

export interface ICategoryTypeOrmRepository
  extends ICategoryRepository<ICategory> {}

export interface ICategoryTypegooseRepository
  extends ICategoryRepository<ICategory> {}
