import { getRepository } from 'typeorm';
import { ILastRatingRepository, IRating, IRatingPostgres } from '../../../types/types';
import { LastRating } from '../../db/postgresql/entity/lastRating';

export default class LastRatingTypeOrmRepository implements ILastRatingRepository {
  public async getLast10(): Promise<IRating[] | null> {
    const data: IRating[] = await getRepository(LastRating).find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });

    return data.length > 0 ? data : null;
  }

  public async deleteOldRatings(): Promise<boolean> {
    const lastRatings = await this.getLast10();

    if (lastRatings) {
      const { createdAt } = lastRatings[lastRatings.length - 1];

      await getRepository(LastRating).createQueryBuilder().delete().where('createdAt < :createdAt', { createdAt });

      return true;
    }

    return false;
  }

  public async create(entity: IRating): Promise<IRating> {
    const data = await getRepository(LastRating).save(entity as LastRating);

    return data;
  }

  public async update(entity: IRating): Promise<IRating | null> {
    const lastRatingRepository = getRepository(LastRating);
    const rating = await lastRatingRepository.findOne(entity._id as string);
    let updatedRating = null;

    if (rating) {
      rating.rating = entity.rating;
      rating.createdAt = entity.createdAt;
      updatedRating = await lastRatingRepository.save(rating);
    } else {
      updatedRating = await this.create(entity);
    }

    return updatedRating;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await getRepository(LastRating).delete({ _id: id });
    return deleteResult.affected !== 0 ? true : false;
  }
}
