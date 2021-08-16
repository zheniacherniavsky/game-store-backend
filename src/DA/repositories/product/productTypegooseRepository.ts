import { IProduct, IProductTypegooseRepository } from '../../../types/types';
import { ProductModel } from '../../db/mongodb/models/product';

export default class ProductTypegooseRepository
  implements IProductTypegooseRepository
{
  public async create(entity: IProduct): Promise<IProduct> {
    const data: IProduct = await new ProductModel(entity).save();
    return data;
  }

  public async getAll(): Promise<IProduct[]> {
    const data: IProduct[] = await ProductModel.find();
    return data;
  }
}
