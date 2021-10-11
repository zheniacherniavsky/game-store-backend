import { mongoose } from '@typegoose/typegoose';
import { ProductQueryObject, productSearchQueryHandler } from '../../../helpers/queryHandler';
import { IPagination, paginationQueryHandler } from '../../../helpers/queryHandler/pagination';
import { IProduct, IProductRepository, IRating } from '../../../types/types';
import { CategoryModel } from '../../db/mongodb/models/category';
import { Product, ProductModel } from '../../db/mongodb/models/product';

export default class ProductTypegooseRepository implements IProductRepository {
  private async handleProductCategories(entity: IProduct) {
    entity.categoriesIds = (await CategoryModel.find({ _id: { $in: entity.categoriesIds } })).map((category) =>
      category._id.toString()
    );
  }

  public async getById(id: string): Promise<IProduct | null> {
    const data: IProduct | null = await ProductModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }

  public async update(entity: IProduct): Promise<IProduct | null> {
    await this.handleProductCategories(entity);
    await ProductModel.findOneAndUpdate({ _id: entity._id }, entity as Product);
    const data = entity._id !== undefined ? await this.getById(entity._id.toString()) : null;
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const data = await ProductModel.deleteOne({ _id: id });
    return data.deletedCount !== 0 ? true : false;
  }
  public async create(entity: IProduct): Promise<IProduct> {
    await this.handleProductCategories(entity);
    const data: IProduct = await new ProductModel(entity).save();
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
    const isUpdated = await ProductModel.findOneAndUpdate(
      {
        _id: productId,
        'ratings.userId': ratingObject.userId,
      },
      {
        $set: {
          'ratings.$.rating': ratingObject.rating,
        },
      }
    );

    if (isUpdated === null) {
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
    }

    const [{ avgRating }] = await ProductModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(productId) } },
      { $project: { avgRating: { $avg: '$ratings.rating' } } },
    ]);

    const updating = await ProductModel.updateOne({ _id: productId }, { $set: { totalRating: avgRating.toFixed(2) } });

    return updating.ok ? await this.getById(productId) : null;
  }
}
