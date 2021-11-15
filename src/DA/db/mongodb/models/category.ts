import { getModelForClass, index, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { ICategoryMongo, IProductMongo } from '../../../../types/types';

@index({ displayName: 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Category implements ICategoryMongo {
  @prop()
  public displayName: string;

  @prop({ ref: 'Product' })
  public products: Ref<IProductMongo>[];
}

export const CategoryModel = getModelForClass(Category);
