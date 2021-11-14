import { getModelForClass, prop, modelOptions, Severity, index } from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { IProduct, IRating } from '../../../../types/types';

@index({ displayName: 1 }, { unique: true })
@index({ createdAt: 1, totalRating: 1, price: 1 })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Product implements IProduct {
  @prop()
  public displayName: string;

  @prop({ default: [] }, WhatIsIt.ARRAY)
  public categoriesIds: string[];

  @prop()
  public createdAt: Date;

  @prop({ default: 0 })
  public totalRating: number;

  @prop()
  public price: number;

  @prop({ default: [] }, WhatIsIt.ARRAY)
  public ratings: IRating[];
}

export const ProductModel = getModelForClass(Product);
