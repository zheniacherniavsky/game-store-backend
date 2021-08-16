import { getRepository } from 'typeorm';
import { IProduct, IProductTypeOrmRepository } from '../../../types/types';
import { Product } from '../../db/postgresql/entity/product';

export default class ProductTypeOrmRepository
  implements IProductTypeOrmRepository
{
  public async create(entity: IProduct): Promise<IProduct> {
    const data = await getRepository(Product).save(entity as Product);
    return data;
  }

  public async getAll(): Promise<IProduct[]> {
    const data: IProduct[] = await getRepository(Product).find();
    return data;
  }
}
