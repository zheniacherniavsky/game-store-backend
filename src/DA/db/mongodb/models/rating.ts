import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { IRating } from '../../../../types/types';

@index({ userId: 1, productId: 1 })
export class Rating implements IRating {
  @prop()
  userId: string;

  @prop()
  productId: string;

  @prop()
  rating: number;
}

export const RatingModel = getModelForClass(Rating);
