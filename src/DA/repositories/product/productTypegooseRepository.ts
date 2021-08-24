import { mongoose } from '@typegoose/typegoose';
import {
  PaginationObject,
  productSearchQueryHandler,
  QueryObject,
} from '../../../helpers/queryHandler';
import { paginationQueryHandler } from '../../../helpers/queryHandler/pagination';
import { IProduct, IProductRepository } from '../../../types/types';
import { Product, ProductModel } from '../../db/mongodb/models/product';

export default class ProductTypegooseRepository
  implements IProductRepository
{
  public async getById(id: string): Promise<IProduct | null> {
    const data: IProduct | null = await ProductModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return data;
  }

  public async update(entity: IProduct): Promise<boolean> {
    const data: IProduct | null = await ProductModel.findOneAndUpdate(
      { _id: entity._id },
      entity as Product,
    );
    return data ? true : false;
  }

  public async delete(entity: IProduct): Promise<boolean> {
    const data = await ProductModel.deleteOne({ _id: entity._id });
    return data ? true : false;
  }
  public async create(entity: IProduct): Promise<IProduct> {
    const data: IProduct = await new ProductModel(entity).save();
    return data;
  }

  public async getAll(query?: QueryObject): Promise<IProduct[]> {
    let searchOptions,
      sortOptions = {};

    let pagination: PaginationObject = {
      skip: 0,
      limit: 10,
    };

    if (query) {
      const typegooseOptions =
        productSearchQueryHandler(query).typegooseOptions;
      pagination = paginationQueryHandler(query).typegooseOptions.pagination;

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
