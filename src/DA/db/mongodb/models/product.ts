import {
  getModelForClass,
  prop,
  modelOptions,
  Severity,
  index,
} from '@typegoose/typegoose';
import { IProduct } from '../../../../types/types';

@index({ displayName: 1 }, { unique: true })
@index({ createdAt: 1, totalRating: 1, price: 1 })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Product implements IProduct {
  @prop()
  public displayName: string;

  @prop({default: []})
  public categoriesIds: string[];

  @prop()
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;
}

export const ProductModel = getModelForClass(Product);
