import { getRepository } from 'typeorm';
import { CategoryQueryObject } from '../../../helpers/queryHandler';
import { categorySearchQueryHandler } from '../../../helpers/queryHandler/category';
import { ICategory, ICategoryRepository } from '../../../types/types';
import { Category } from '../../db/postgresql/entity/category';

export default class CategoryTypeOrmRepository implements ICategoryRepository {
  public async getById(
    id: string,
    categoryQuery: CategoryQueryObject,
  ): Promise<ICategory | null> {
    const searchParams = categorySearchQueryHandler(categoryQuery);

    const myQuery = getRepository(Category)
      .createQueryBuilder('category')
      .where('category._id = :id', { id });

    if (searchParams.includeProducts === true) {
      myQuery.innerJoinAndSelect('category.products', 'products');

      if (searchParams.includeTop3Products === true)
        myQuery.orderBy('products.totalRating', 'DESC').limit(3);
    }

    const data = await myQuery.getOne();

    return data ? data : null;
  }

  public async update(entity: ICategory): Promise<boolean> {
    await getRepository(Category).update(
      { _id: (entity as Category)._id },
      entity as Category,
    );
    return true;
  }

  public async delete(entity: ICategory): Promise<boolean> {
    await getRepository(Category).delete({ _id: (entity as Category)._id });
    return true;
  }

  public async create(entity: ICategory): Promise<ICategory> {
    const data = await getRepository(Category).save(entity as Category);
    return data;
  }

  public async getCategoriesList(): Promise<ICategory[]> {
    const data: ICategory[] = await getRepository(Category).find({});

    return data;
  }
}
