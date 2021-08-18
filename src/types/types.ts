/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IProduct {
  _id: string;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
}

export interface ICategory {
  _id: string;
  displayName: string;
}

interface Repository<T> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
  create: (entity: T) => Promise<T>;
  update: (entity: T) => Promise<boolean>;
  delete: (entity: T) => Promise<boolean>;
}

export interface IProductRepository extends Repository<IProduct> {}
export interface ICategoryRepository extends Repository<ICategory> {}

export interface IProductTypeOrmRepository
  extends IProductRepository {}

export interface IProductTypegooseRepository
  extends IProductRepository {}

export interface ICategoryTypeOrmRepository
  extends ICategoryRepository {}

export interface ICategoryTypegooseRepository
  extends ICategoryRepository {}
