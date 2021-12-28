import { mongoose } from '@typegoose/typegoose';
import { LastRatingRepository } from '../..';
import { ProductQueryObject, productSearchQueryHandler } from '../../../helpers/queryHandler';
import { IPagination, paginationQueryHandler } from '../../../helpers/queryHandler/pagination';
import { ResponseError } from '../../../middlewares/errorHandler';
import { ICategoryMongo, IProduct, IProductRepository, IRating } from '../../../types/types';
import { CategoryModel } from '../../db/mongodb/models/category';
import { Product, ProductModel } from '../../db/mongodb/models/product';

export default class ProductTypegooseRepository implements IProductRepository {
  public async getById(id: string): Promise<IProduct | null> {
    const data: IProduct | null = await ProductModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }

  public async update(entity: IProduct, categoriesIds: string[] = []): Promise<IProduct | null> {
    let categories: ICategoryMongo[] = [];
    if (categoriesIds.length > 0) {
      categories = await CategoryModel.find({ _id: categoriesIds });
      entity.categories = categories;
    }
    await ProductModel.findOneAndUpdate({ _id: entity._id }, entity as Product);
    const data = entity._id !== undefined ? await this.getById(entity._id.toString()) : null;
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const data = await ProductModel.deleteOne({ _id: id });
    return data.deletedCount !== 0 ? true : false;
  }
  public async create(entity: IProduct, categoriesIds: string[] = []): Promise<IProduct> {
    let categories: ICategoryMongo[] = [];
    if (categoriesIds.length > 0) {
      categories = await CategoryModel.find({ _id: categoriesIds });
    }
    entity.categories = categories;
    const data: IProduct = await new ProductModel(entity).save().catch((reason) => {
      throw new ResponseError(400, reason);
    });
    return data;
  }

  public async getProductsList(productQuery: ProductQueryObject): Promise<IProduct[]> {
    let searchOptions,
      sortOptions = {};

    let pagination: IPagination = {
      skip: 0,
      limit: 10,
    };

    if (productQuery) {
      const typegooseOptions = productSearchQueryHandler(productQuery).typegooseOptions;
      pagination = paginationQueryHandler(productQuery).typegooseOptions.pagination;
      searchOptions = typegooseOptions.find;
      sortOptions = typegooseOptions.sort;
    }

    const data: IProduct[] = await ProductModel.find({
      ...searchOptions,
    })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort(sortOptions);
    return data;
  }

  public async rateProduct(productId: string, ratingObject: IRating): Promise<IProduct | null> {
    const product = await this.getById(productId);

    if (product) {
      // find product with user rating
      const productWithUserRating = await ProductModel.findOneAndUpdate(
        {
          _id: productId,
          'ratings.userId': ratingObject.userId,
        },
        {
          // replace existing user rating
          $set: {
            'ratings.$.rating': ratingObject.rating,
          },
        }
      );

      if (productWithUserRating === null) {
        // find product and push user rating object
        await ProductModel.findOneAndUpdate(
          {
            _id: productId,
          },
          {
            $push: {
              ratings: ratingObject,
            },
          }
        );
        ratingObject.product = product;
        await LastRatingRepository.create(ratingObject);
      } else {
        ratingObject.product = product;
        await LastRatingRepository.update(ratingObject);
      }

      const [{ avgRating }] = await ProductModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(productId) } },
        { $project: { avgRating: { $avg: '$ratings.rating' } } },
      ]);

      const updating = await ProductModel.updateOne(
        { _id: productId },
        { $set: { totalRating: avgRating.toFixed(2) } }
      );

      return updating.ok ? await this.getById(productId) : null;
    } else return null;
  }
}
