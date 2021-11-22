/* eslint-disable @typescript-eslint/no-empty-interface */
import { Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { CategoryQueryObject, ProductQueryObject } from '../helpers/queryHandler';

export interface RequestUser {
  id: string;
  username: string;
  role: string;
}

// Models
export interface IProduct {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  ratings: IRating[];
  totalRating: number;
  price: number;
  categories?: ICategoryPostgres[] | Ref<ICategoryMongo>[];
}

export interface IProductMongo {
  _id?: ObjectId;
  displayName: string;
  createdAt: Date;
  ratings: IRating[];
  totalRating: number;
  price: number;
  categories: Ref<ICategoryMongo>[];
}

export interface IProductPostgres {
  _id?: string;
  displayName: string;
  createdAt: Date;
  ratings: IRating[];
  totalRating: number;
  price: number;
  categories: ICategoryPostgres[];
}

export interface ICategory {
  _id?: ObjectId | string;
  displayName: string;
  products?: IProduct[] | Ref<IProductMongo>[];
}

export interface ICategoryMongo {
  _id?: ObjectId;
  displayName: string;
  products: Ref<IProductMongo>[];
}

export interface ICategoryPostgres {
  _id: string;
  displayName: string;
  products: IProductPostgres[];
}

export interface IAccount {
  _id?: ObjectId | string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface IRating {
  _id?: string;
  userId: ObjectId | string;
  rating: number;
  createdAt: Date;
  product?: IProduct;
}

// Repositories

export interface IProductRepository {
  getById: (id: string) => Promise<IProduct | null>;
  create: (entity: IProduct, categoriesIds: string[]) => Promise<IProduct>;
  update: (entity: IProduct, categoriesIds: string[]) => Promise<IProduct | null>;
  delete: (id: string) => Promise<boolean>;
  getProductsList: (productQuery: ProductQueryObject) => Promise<IProduct[]>;
  rateProduct: (productId: string, ratingObj: IRating) => Promise<IProduct | null>;
  getLastRatings: () => Promise<IRating[] | null>;
}
export interface ICategoryRepository {
  getById: (id: string, query?: CategoryQueryObject) => Promise<ICategory | null>;
  create: (entity: ICategory) => Promise<ICategory>;
  update: (entity: ICategory) => Promise<ICategory | null>;
  delete: (id: string) => Promise<boolean>;
  getCategoriesList: () => Promise<ICategory[]>;
}
export interface IAccountRepository {
  getById: (id: string) => Promise<IAccount | null>;
  create: (entity: IAccount) => Promise<IAccount>;
  update: (entity: IAccount) => Promise<IAccount | null>;
  delete: (id: string) => Promise<boolean>;
  getByUsername: (username: string) => Promise<IAccount | null>;
}
