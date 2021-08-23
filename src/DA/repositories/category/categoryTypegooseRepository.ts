import { mongoose } from '@typegoose/typegoose';
import { ICategory, ICategoryTypegooseRepository } from '../../../types/types';
import { Category, CategoryModel } from '../../db/mongodb/models/category';

export default class CategoryTypegooseRepository
  implements ICategoryTypegooseRepository
{
  public async getById(id: string): Promise<ICategory | null> {
    const data: ICategory | null = await CategoryModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }

  public async update(entity: ICategory): Promise<boolean> {
    const data: ICategory | null = await CategoryModel.findOneAndUpdate(
      { _id: entity._id },
      entity as Category,
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
