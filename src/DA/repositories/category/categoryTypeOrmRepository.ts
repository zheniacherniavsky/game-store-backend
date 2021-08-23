import { getRepository } from 'typeorm';
import { QueryObject } from '../../../helpers/queryHandler';
import { categorySearchQueryHandler } from '../../../helpers/queryHandler/category';
import { ICategoryTypeOrmRepository, ICategory } from '../../../types/types';
import { Category } from '../../db/postgresql/entity/category';

export default class CategoryTypeOrmRepository
  implements ICategoryTypeOrmRepository
{
  public async getById(id: string, query?: QueryObject): Promise<ICategory | null> {
    const searchParams = categorySearchQueryHandler(query).typeOrmOptions;
    const data: ICategory | undefined = await getRepository(Category).findOne({
      _id: id,
      ...searchParams,
    });

    if (searchParams.includeTop3Products === true && data !== undefined) {
      data.products = data.products?.sort((a,b) => b.totalRating - a.totalRating).slice(0,3);
    } 

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

  public async getAll(query?: QueryObject): Promise<ICategory[]> {
    const searchOptions = categorySearchQueryHandler(query).typeOrmOptions;
    const data: ICategory[] = await getRepository(Category).find({
      ...searchOptions,
    });

    return data;
  }
}
