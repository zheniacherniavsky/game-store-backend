import { getRepository } from 'typeorm';
import { ProductQueryObject, productSearchQueryHandler } from '../../../helpers/queryHandler';
import { paginationQueryHandler } from '../../../helpers/queryHandler/pagination';
import { IProduct, IProductRepository } from '../../../types/types';
import { Category } from '../../db/postgresql/entity/category';
import { Product } from '../../db/postgresql/entity/product';

export default class ProductTypeOrmRepository implements IProductRepository {
  public async getById(id: string): Promise<IProduct | null> {
    const data: IProduct | undefined = await getRepository(Product).findOne({
      _id: id,
    });
    return data ? data : null;
  }

  public async update(entity: IProduct): Promise<boolean> {
    await getRepository(Product).update({ _id: (entity as Product)._id }, entity as Product);
    return true;
  }

  public async delete(entity: IProduct): Promise<boolean> {
    await getRepository(Product).delete({ _id: (entity as Product)._id });
    return true;
  }
  public async create(entity: IProduct): Promise<IProduct> {
    if (entity.categoriesIds) {
      console.log(entity.categoriesIds.join(','));
      const categories = await getRepository(Category)
        .createQueryBuilder('category')
        .where(`category._id IN (${entity.categoriesIds.join(',')})`)
        .getMany();

      entity.categories = categories;
    }
    delete entity.categoriesIds;
    const data = await getRepository(Product).save(entity as Product);
    return data;
  }

  public async getProductsList(productQuery: ProductQueryObject): Promise<IProduct[]> {
    const searchOptions = productSearchQueryHandler(productQuery).typeOrmOptions;
    const pagination = paginationQueryHandler(productQuery).typeOrmOptions;

    const data: IProduct[] = await getRepository(Product).find({
      ...searchOptions,
      ...pagination,
      relations: ['categories'],
    });
    return data;
  }
}
