import {
  getModelForClass,
  prop,
  modelOptions,
  Severity,
  Ref,
  index,
} from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { IProduct } from '../../../../types/types';
import { Category } from './category';

@index({ displayName: 1 }, { unique: true })
@index({ createdAt: 1, totalRating: 1, price: 1 })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Product implements IProduct {
  @prop()
  public displayName: string;

  @prop({ ref: () => Category, default: [] }, WhatIsIt.ARRAY)
  public categoryIds: Ref<Category>[];

  @prop()
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;
}

export const ProductModel = getModelForClass(Product);
