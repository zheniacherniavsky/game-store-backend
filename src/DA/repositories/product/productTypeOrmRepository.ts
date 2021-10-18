import { getRepository } from 'typeorm';
import { ProductQueryObject, productSearchQueryHandler } from '../../../helpers/queryHandler';
import { paginationQueryHandler } from '../../../helpers/queryHandler/pagination';
import { IProduct, IProductRepository, IRating } from '../../../types/types';
import { Category } from '../../db/postgresql/entity/category';
import { Product } from '../../db/postgresql/entity/product';
import { Rating } from '../../db/postgresql/entity/rating';

export default class ProductTypeOrmRepository implements IProductRepository {
  private async handleProductCategories(entity: IProduct) {
    if (entity.categoriesIds && entity.categoriesIds.length > 0) {
      const categories = await getRepository(Category)
        .createQueryBuilder('category')
        .where(`category._id IN (${entity.categoriesIds.join(',')})`)
        .getMany();

      entity.categories = categories;
      entity.categoriesIds = categories.map((category) => category._id);
    }
  }

  public async getById(id: string): Promise<IProduct | null> {
    const data: IProduct | undefined = await getRepository(Product).findOne({
      _id: id,
    });
    return data ? data : null;
  }

  public async update(entity: IProduct): Promise<IProduct | null> {
    await this.handleProductCategories(entity);
    const data = await getRepository(Product).save(entity as Product);
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await getRepository(Product).delete({ _id: id });
    return deleteResult.affected !== 0 ? true : false;
  }
  public async create(entity: IProduct): Promise<IProduct> {
    await this.handleProductCategories(entity);
    const data = await getRepository(Product).save(entity as Product);
    return data;
  }

  public async getProductsList(productQuery: ProductQueryObject): Promise<IProduct[]> {
    const searchOptions = productSearchQueryHandler(productQuery).typeOrmOptions;
    const pagination = paginationQueryHandler(productQuery).typeOrmOptions;

    const data: IProduct[] = await getRepository(Product).find({
      ...searchOptions,
      ...pagination,
    });
    return data;
  }

  public async rateProduct(productId: string, ratingObj: IRating): Promise<IProduct | null> {
    const product = await this.getById(productId);
    if (!product) return null;

    const ratingRepository = getRepository(Rating);
    const rating = await ratingRepository.findOne({ where: { userId: ratingObj.userId, product } });
    if (rating) {
      rating.rating = ratingObj.rating;
      await ratingRepository.save(rating);
    } else {
      ratingObj.product = product;
      await ratingRepository.save(ratingObj as Rating);
    }

    return await this.getById(productId);
  }
}
