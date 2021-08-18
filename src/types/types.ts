import { Ref } from '@typegoose/typegoose/lib/types';
import { ObjectId } from 'mongoose';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IProduct {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
  categories?: ICategory[];
  categoryIds?: Ref<ICategory>[];
}

export interface ICategory {
  _id?: ObjectId | string;
  displayName: string;
}

interface Repository<T, K> {
  getAll: () => Promise<T[]>;
  getById: (id: K) => Promise<T | null>;
  create: (entity: T) => Promise<T>;
  update: (entity: T) => Promise<boolean>;
  delete: (entity: T) => Promise<boolean>;
}

export interface IProductRepository<F> extends Repository<IProduct, F> {}
export interface ICategoryRepository<F> extends Repository<ICategory, F> {}

export interface IProductTypeOrmRepository extends IProductRepository<string> {}

export interface IProductTypegooseRepository
  extends IProductRepository<ObjectId> {}

export interface ICategoryTypeOrmRepository
  extends ICategoryRepository<string> {}

export interface ICategoryTypegooseRepository
  extends ICategoryRepository<ObjectId> {}
