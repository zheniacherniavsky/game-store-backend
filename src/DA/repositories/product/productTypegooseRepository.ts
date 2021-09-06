import { mongoose } from '@typegoose/typegoose';
import { ProductQueryObject, productSearchQueryHandler } from '../../../helpers/queryHandler';
import { IPagination, paginationQueryHandler } from '../../../helpers/queryHandler/pagination';
import { IProduct, IProductRepository } from '../../../types/types';
import { CategoryModel } from '../../db/mongodb/models/category';
import { Product, ProductModel } from '../../db/mongodb/models/product';

export default class ProductTypegooseRepository implements IProductRepository {
  public async getById(id: string): Promise<IProduct | null> {
    const data: IProduct | null = await ProductModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }

  public async update(entity: IProduct): Promise<boolean> {
    const data: IProduct | null = await ProductModel.findOneAndUpdate({ _id: entity._id }, entity as Product);
    return data ? true : false;
  }

  public async delete(entity: IProduct): Promise<boolean> {
    const data = await ProductModel.deleteOne({ _id: entity._id });
    return data ? true : false;
  }
  public async create(entity: IProduct): Promise<IProduct> {
    entity.categoriesIds = (await CategoryModel.find({ _id: { $in: entity.categoriesIds } })).map((category) =>
      category._id.toString()
    );
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
}
