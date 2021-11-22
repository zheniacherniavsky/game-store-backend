import { getModelForClass, prop, modelOptions, Severity, index, Ref } from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { ICategoryMongo, IProductMongo, IRating } from '../../../../types/types';

@index({ displayName: 1 }, { unique: true })
@index({ createdAt: 1, totalRating: 1, price: 1, 'ratings.createdAt': 1 })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Product implements IProductMongo {
  @prop()
  public displayName: string;

  @prop({ ref: 'Category' })
  categories: Ref<ICategoryMongo>[];

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
