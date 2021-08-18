import { getRepository } from 'typeorm';
import { ICategoryTypeOrmRepository, ICategory } from '../../../types/types';
import { Category } from '../../db/postgresql/entity/category';

export default class CategoryTypeOrmRepository implements ICategoryTypeOrmRepository {
  public async getById(id: string): Promise<ICategory | null> {
    const data: ICategory | undefined = await getRepository(Category).findOne({_id: id});
    return data ? data : null;
  }

  public async update(entity: ICategory): Promise<boolean> {
    await getRepository(Category).update({_id: entity._id}, entity);
    return true;
  }

  public async delete(entity: ICategory): Promise<boolean> {
    await getRepository(Category).delete({_id: entity._id});
    return true;
  }
  
  public async create(entity: ICategory): Promise<ICategory> {
    const data = await getRepository(Category).save(entity);
    return data;
  }

  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await getRepository(Category).find({
      relations: ['products'],
    });
    return data;
  }
}
