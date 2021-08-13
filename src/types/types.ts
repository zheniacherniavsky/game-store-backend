import { ObjectId } from "mongoose";

export interface IProduct {
  displayName: string,
  categoryIds: ObjectId[],
  createdAt: Date,
  totalRating: number,
  price: number
}

export interface ICategory {
  displayName: string;
}

export interface IDatabaseOperations<T> {
  getAll: () => Promise<T[]>
}