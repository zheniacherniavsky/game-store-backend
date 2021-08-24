import { getRepository } from 'typeorm';
import {
  productSearchQueryHandler,
  QueryObject,
} from '../../../helpers/queryHandler';
import { paginationQueryHandler } from '../../../helpers/queryHandler/pagination';
import { IProduct, IProductRepository } from '../../../types/types';
import { Product } from '../../db/postgresql/entity/product';

export default class ProductTypeOrmRepository
  implements IProductRepository
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

  public async getAll(query: QueryObject | undefined): Promise<IProduct[]> {
    const searchOptions = productSearchQueryHandler(query).typeOrmOptions;
    const pagination = paginationQueryHandler(query).typeOrmOptions;

    const data: IProduct[] = await getRepository(Product).find({
      ...searchOptions,
      ...pagination,
      relations: ["categories"]
    });
    return data;
  }
}
