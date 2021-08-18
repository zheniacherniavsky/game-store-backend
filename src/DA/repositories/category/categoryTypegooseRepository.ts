import { ObjectId } from 'mongoose';
import { ICategory, ICategoryTypegooseRepository } from '../../../types/types';
import { CategoryModel } from '../../db/mongodb/models/category';

export default class CategoryTypegooseRepository
  implements ICategoryTypegooseRepository
{
  public async getById(id: ObjectId): Promise<ICategory | null> {
    if (typeof id == 'string') {
      console.warn('Cannot use number id with MongoDB.');
      return null;
    }
    const data: ICategory | null = await CategoryModel.findById(id);
    return data;
  }

  public async update(entity: ICategory): Promise<boolean> {
    const data: ICategory | null = await CategoryModel.findOneAndUpdate(
      { _id: entity._id },
      entity,
    );
    return data ? true : false;
  }

  public async delete(entity: ICategory): Promise<boolean> {
    const data = await CategoryModel.deleteOne({ _id: entity._id });
    return data ? true : false;
  }

  public async create(entity: ICategory): Promise<ICategory> {
    const data: ICategory = await new CategoryModel(entity).save();
    return data;
  }

  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await CategoryModel.find();
    return data;
  }
}
