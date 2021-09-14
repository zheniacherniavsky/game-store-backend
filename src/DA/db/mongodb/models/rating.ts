import { getModelForClass, index, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { IRating } from '../../../../types/types';

@index({ userId: 1, productId: 1, createdAt: 1 })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Rating implements IRating {
  @prop()
  userId: string;

  @prop()
  productId: string;

  @prop()
  rating: number;

  @prop()
  createdAt: Date;
}

export const RatingModel = getModelForClass(Rating);
