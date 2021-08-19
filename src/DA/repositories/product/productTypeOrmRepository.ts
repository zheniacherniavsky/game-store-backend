import { getRepository } from 'typeorm';
import { IProduct, IProductTypeOrmRepository } from '../../../types/types';
import { Product } from '../../db/postgresql/entity/product';

export default class ProductTypeOrmRepository
  implements IProductTypeOrmRepository
{
  public async getById(id: string): Promise<IProduct | null> {
    const data: IProduct | undefined = await getRepository(Product).findOne({
      _id: id,
    });
    return data ? data : null;
  }

  public async update(entity: IProduct): Promise<boolean> {
    await getRepository(Product).update(
      { _id: (entity as Product)._id },
      entity as Product,
    );
    return true;
  }

  public async delete(entity: IProduct): Promise<boolean> {
    await getRepository(Product).delete({ _id: (entity as Product)._id });
    return true;
  }
  public async create(entity: IProduct): Promise<IProduct> {
    const data = await getRepository(Product).save(entity as Product);
    return data;
  }

  public async getAll(): Promise<IProduct[]> {
    const data: IProduct[] = await getRepository(Product).find({
      relations: ['categories'],
    });
    return data;
  }
}
