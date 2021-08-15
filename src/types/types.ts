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
