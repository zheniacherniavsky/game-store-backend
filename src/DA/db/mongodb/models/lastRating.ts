import { getModelForClass, prop, index, Ref } from '@typegoose/typegoose';
import { IRatingMongo, IProductMongo } from '../../../../types/types';

@index({ createdAt: 1, rating: 1 })
export class LastRating implements IRatingMongo {
  @prop()
  userId: string;

  @prop()
  rating: number;

  @prop()
  createdAt: Date;

  @prop({ ref: 'Product' })
  product: Ref<IProductMongo>;
}

export const LastRatingModel = getModelForClass(LastRating);
