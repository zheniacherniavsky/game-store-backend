import { ObjectId } from 'mongoose';
import { IProduct, IProductTypegooseRepository } from '../../../types/types';
import { ProductModel } from '../../db/mongodb/models/product';

export default class ProductTypegooseRepository
  implements IProductTypegooseRepository
{
  public async getById(id: ObjectId): Promise<IProduct | null> {
    if (typeof id !== 'string') {
      const data: IProduct | null = await ProductModel.findById(id);
      return data;
    }
    console.warn('Cannot use string id with MongoDB.');
    return null;
  }

  public async update(entity: IProduct): Promise<boolean> {
    const data: IProduct | null = await ProductModel.findOneAndUpdate(
      { _id: entity._id },
      entity,
    );
    return data ? true : false;
  }

  public async delete(entity: IProduct): Promise<boolean> {
    const data = await ProductModel.deleteOne({ _id: entity._id });
    return data ? true : false;
  }
  public async create(entity: IProduct): Promise<IProduct> {
    const data: IProduct = await new ProductModel(entity).save();
    return data;
  }

  public async getAll(): Promise<IProduct[]> {
    const data: IProduct[] = await ProductModel.find();
    return data;
  }
}
