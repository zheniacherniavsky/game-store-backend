import { getRepository } from 'typeorm';
import { ICategoryTypeOrmRepository, ICategory } from '../../../types/types';
import { Category } from '../../db/postgresql/entity/category';

export default class CategoryTypeOrmRepository
  implements ICategoryTypeOrmRepository
{
  public async create(entity: ICategory): Promise<ICategory> {
    const data = await getRepository(Category).save(entity);
    return data;
  }

  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await getRepository(Category).find({relations: ["products"]});
    return data;
  }
}
