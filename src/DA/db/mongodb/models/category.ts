import { getModelForClass, index, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { ICategory } from '../../../../types/types';
import { Product } from './product';

@index({ displayName: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Category implements ICategory {
  @prop()
  public displayName: string;

  @prop({ default: undefined })
  public products: Product[];
}

export const CategoryModel = getModelForClass(Category);
