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

export interface IDatabaseModelOperations<T> {
  getAll: () => Promise<T[]>;
}

export interface IProductRepository<T, K> {
  getAll: () => Promise<T[]>;
  getById: (id: K) => Promise<T>;
}

export interface ICategoryRepository<T, K> {
  getAll: () => Promise<T[]>;
  getById: (id: K) => Promise<T>;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IProductTypeOrmRepository
  extends IProductRepository<IProduct, number> {}

export interface IProductTypegooseRepository
  extends IProductRepository<IProduct, ObjectId> {}

export interface ICategoryTypeOrmRepository
  extends ICategoryRepository<ICategory, number> {}

export interface ICategoryTypegooseRepository
  extends ICategoryRepository<ICategory, ObjectId> {}
