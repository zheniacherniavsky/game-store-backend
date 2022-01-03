import { ILastRatingRepository, IRating } from '../../../types/types';
import { LastRating, LastRatingModel } from '../../db/mongodb/models/lastRating';
import { Product } from '../../db/mongodb/models/product';

export default class LastRatingTypegooseRepository implements ILastRatingRepository {
  public async getLast10(): Promise<IRating[] | null> {
    const data: IRating[] = await LastRatingModel.find()
      .sort([['createdAt', 'DESC']])
      .limit(10);

    return data.length > 0 ? data : null;
  }

  public async deleteOldRatings(): Promise<boolean> {
    const lastRatings = await this.getLast10();

    if (lastRatings) {
      const { createdAt } = lastRatings[lastRatings.length - 1];
      await LastRatingModel.remove({ createdAt: { $lt: createdAt } });

      return true;
    }

    return false;
  }

  public async create(entity: IRating): Promise<IRating> {
    await new LastRatingModel(entity).save();
    return entity;
  }

  public async update(entity: IRating): Promise<IRating | null> {
    await LastRatingModel.findOneAndUpdate(
      { product: entity.product as Product, userId: entity.userId },
      entity as LastRating
    );
    const data = await LastRatingModel.findOne({ _id: entity._id });
    return data ? data : null;
  }

  public async delete(id: string): Promise<boolean> {
    const data = await LastRatingModel.deleteOne({ _id: id });
    return data ? true : false;
  }
}
