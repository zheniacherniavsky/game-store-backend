import { mongoose } from '@typegoose/typegoose';
import { CategoryQueryObject } from '../../../helpers/queryHandler';
import { categorySearchQueryHandler } from '../../../helpers/queryHandler/category';
import { ICategory, ICategoryRepository } from '../../../types/types';
import { Category, CategoryModel } from '../../db/mongodb/models/category';
import { ProductModel } from '../../db/mongodb/models/product';

export default class CategoryTypegooseRepository implements ICategoryRepository {
  public async getById(id: string, categoryQuery: CategoryQueryObject): Promise<ICategory | null> {
    const searchOptions = categorySearchQueryHandler(categoryQuery);
    const objectId = new mongoose.Types.ObjectId(id);

    const data: ICategory | null = await CategoryModel.findOne({
      _id: objectId,
    });

    if (searchOptions.includeProducts === true && data !== null) {
      let additionalProducts;

      if (searchOptions.includeTop3Products === false) {
        additionalProducts = await ProductModel.find({
          categoriesIds: id,
        });
      } else {
        additionalProducts = await ProductModel.find({
          categoriesIds: id,
        })
          .sort([['totalRating', 'DESC']])
          .limit(3);
      }

      data.products = additionalProducts;
    }

    return data;
  }

  public async update(entity: ICategory): Promise<ICategory | null> {
    await CategoryModel.findOneAndUpdate({ _id: entity._id }, entity as Category);
    const data = entity._id !== undefined ? await this.getById(entity._id.toString(), {}) : null;
    return data;
  }

  public async delete(id: string): Promise<boolean> {
    const data = await CategoryModel.deleteOne({ _id: id });
    return data ? true : false;
  }

  public async create(entity: ICategory): Promise<ICategory> {
    const data: ICategory = await new CategoryModel(entity).save();
    return data;
  }

  public async getCategoriesList(): Promise<ICategory[]> {
    const data: ICategory[] = await CategoryModel.find();
    return data;
  }
}
