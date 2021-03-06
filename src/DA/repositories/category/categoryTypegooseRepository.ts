import { mongoose } from '@typegoose/typegoose';
import { CategoryQueryObject } from '../../../helpers/queryHandler';
import { categorySearchQueryHandler } from '../../../helpers/queryHandler/category';
import { ICategory, ICategoryRepository } from '../../../types/types';
import { Category, CategoryModel } from '../../db/mongodb/models/category';
import { ProductModel } from '../../db/mongodb/models/product';

export default class CategoryTypegooseRepository implements ICategoryRepository {
  public async getById(id: string, categoryQuery?: CategoryQueryObject): Promise<ICategory | null> {
    const searchOptions = categoryQuery ? categorySearchQueryHandler(categoryQuery) : null;
    const objectId = new mongoose.Types.ObjectId(id);

    const data: ICategory | null = await CategoryModel.findOne(
      {
        _id: objectId,
      },
      'displayName'
    );

    if (searchOptions && searchOptions.includeProducts === true && data !== null) {
      let additionalProducts;

      if (searchOptions.includeTop3Products === false) {
        additionalProducts = await ProductModel.find({ categories: objectId }, 'displayName price');
      } else {
        additionalProducts = await ProductModel.find({ categories: objectId }, 'displayName price')
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
    await ProductModel.updateMany({ categoriesIds: id }, { $pull: { categoriesIds: id } });
    const data = await CategoryModel.deleteOne({ _id: id });
    return data ? true : false;
  }

  public async create(entity: ICategory): Promise<ICategory> {
    const data: ICategory = await new CategoryModel(entity as Category).save();
    return data;
  }

  public async getCategoriesList(): Promise<ICategory[]> {
    const data: ICategory[] = await CategoryModel.find({}, 'displayName');
    return data;
  }
}
