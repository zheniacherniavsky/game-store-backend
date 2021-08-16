import { ICategory, ICategoryTypegooseRepository } from '../../../types/types';
import { CategoryModel } from '../../db/mongodb/models/category';

export default class CategoryTypegooseRepository
  implements ICategoryTypegooseRepository
{
  public async create(entity: ICategory): Promise<ICategory> {
    const data: ICategory = await new CategoryModel(entity).save();
    return data;
  }

  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await CategoryModel.find();
    return data;
  }
}
