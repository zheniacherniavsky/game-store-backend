import { mongoose } from '@typegoose/typegoose';
import { IRating, IRatingRepository } from '../../../types/types';
import { Rating, RatingModel } from '../../db/mongodb/models/rating';

export default class RatingTypegooseRepository implements IRatingRepository {
  public async getById(id: string): Promise<IRating | null> {
    const data: IRating | null = await RatingModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }

  public async getByProductId(productId: string): Promise<IRating[]> {
    const data: IRating[] = await RatingModel.find({
      productId,
    });
    return data;
  }

  public async update(entity: IRating): Promise<IRating | null> {
    await RatingModel.findOneAndUpdate({ _id: entity._id }, entity as Rating);
    const data = entity._id !== undefined ? await this.getById(entity._id.toString()) : null;
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const data = await RatingModel.deleteOne({ _id: id });
    return data.deletedCount !== 0 ? true : false;
  }
  public async create(entity: IRating): Promise<IRating> {
    const data: IRating = await new RatingModel(entity).save();
    return data;
  }

  public async getProductRating(productId: string): Promise<number> {
    const productRatings = await this.getByProductId(productId);
    const rating: number =
      productRatings.reduce((result: number, ratingObject: IRating) => result + ratingObject.rating, 0) /
      productRatings.length;

    return Math.floor(rating);
  }
}
