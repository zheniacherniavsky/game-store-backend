import { getRepository } from 'typeorm';
import { IRating, IRatingRepository } from '../../../types/types';
import { LastRating, Rating } from '../../db/postgresql/entity/rating';

export default class RatingTypeOrmRepository implements IRatingRepository {
  public async getLastRatings(): Promise<IRating[]> {
    const data: IRating[] = await getRepository(LastRating).find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });

    return data;
  }

  public async getById(id: string): Promise<IRating | null> {
    const data: IRating | undefined = await getRepository(Rating).findOne({
      _id: id,
    });
    return data ? data : null;
  }

  public async getByProductId(productId: string): Promise<IRating[]> {
    const data: IRating[] = await getRepository(Rating).find({
      productId,
    });
    return data;
  }

  public async update(entity: IRating): Promise<IRating | null> {
    const data = await getRepository(Rating).save(entity as Rating);
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await getRepository(Rating).delete({ _id: id });
    return deleteResult.affected !== 0 ? true : false;
  }
  public async create(entity: IRating): Promise<IRating> {
    const data = await getRepository(Rating).save(entity as Rating);
    getRepository(LastRating).save(entity as LastRating);
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
