import {
  getModelForClass,
  prop,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { IProduct } from '../../types/types';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Product implements IProduct {
  @prop()
  public displayName: string;

  @prop()
  public categoryIds: ObjectId[];

  @prop()
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;
}

export const ProductModel = getModelForClass(Product);
