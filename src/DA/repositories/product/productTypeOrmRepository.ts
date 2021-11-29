import { getRepository } from 'typeorm';
import { LastRatingRepository } from '../..';
import { ProductQueryObject, productSearchQueryHandler } from '../../../helpers/queryHandler';
import { paginationQueryHandler } from '../../../helpers/queryHandler/pagination';
import { ICategoryPostgres, IProduct, IProductRepository, IRating } from '../../../types/types';
import { Category } from '../../db/postgresql/entity/category';
import { Product } from '../../db/postgresql/entity/product';
import { Rating } from '../../db/postgresql/entity/rating';

export default class ProductTypeOrmRepository implements IProductRepository {
  public async getById(id: string): Promise<IProduct | null> {
    const data: IProduct | undefined = await getRepository(Product).findOne({
      _id: id,
    });
    return data ? data : null;
  }

  public async update(entity: IProduct, categoriesIds: string[] = []): Promise<IProduct | null> {
    const data = await this.create(entity, categoriesIds);
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await getRepository(Product).delete({ _id: id });
    return deleteResult.affected !== 0 ? true : false;
  }
  public async create(entity: IProduct, categoriesIds: string[] = []): Promise<IProduct> {
    let categories: ICategoryPostgres[] = [];
    if (categoriesIds.length > 0) {
      categories = await getRepository(Category).find({
        where: categoriesIds.map((id) => ({ _id: id })),
      });
    }
    entity.categories = categories;
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

    ratingObj.product = product as Product;

    const ratingRepository = getRepository(Rating);
    const rating = await ratingRepository.findOne({ where: { userId: ratingObj.userId, product: product } });

    if (rating) {
      rating.rating = ratingObj.rating;
      rating.createdAt = ratingObj.createdAt;
      await ratingRepository.save(rating);
      await LastRatingRepository.update(ratingObj as Rating);
    } else {
      await ratingRepository.save(ratingObj as Rating);
      await LastRatingRepository.create(ratingObj as Rating);
    }

    const [results] = await ratingRepository
      .createQueryBuilder()
      .select('AVG(rating)')
      .where('product_id = :productId', { productId })
      .execute();

    if (results.avg) {
      product.totalRating = parseInt(results.avg);
      await this.update(product);
    }
    return await this.getById(productId);
  }
}
