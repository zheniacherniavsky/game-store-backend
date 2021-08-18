import { getModelForClass, prop } from '@typegoose/typegoose';
import { ICategory } from '../../../../types/types';

export class Category implements ICategory {
  @prop()
  public _id: string;

  @prop()
  public displayName: string;
}

export const CategoryModel = getModelForClass(Category);
