import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { ICategory } from '../../../../types/types';

@index({ displayName: 1 }, { unique: true })
export class Category implements ICategory {
  @prop()
  public displayName: string;
}

export const CategoryModel = getModelForClass(Category);
