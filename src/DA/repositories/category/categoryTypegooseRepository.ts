import { mongoose } from '@typegoose/typegoose';
import { QueryObject } from '../../../helpers/queryHandler';
import { categorySearchQueryHandler } from '../../../helpers/queryHandler/category';
import { ICategory, ICategoryRepository } from '../../../types/types';
import { Category, CategoryModel } from '../../db/mongodb/models/category';
import { ProductModel } from '../../db/mongodb/models/product';

export default class CategoryTypegooseRepository
  implements ICategoryRepository
{
  public async getById(id: string, query?: QueryObject): Promise<ICategory | null> {
    const searchOptions = categorySearchQueryHandler(query);
    const objectId = new mongoose.Types.ObjectId(id);
    const data: ICategory | null = await CategoryModel.findOne({
      _id: objectId,
    });

    // if (data && data._id && searchOptions.includeProducts === true) {
    //   const id : string = data._id.toString();
    //   /* 
    //     idk why it`s don`t work...

    //     data.products = await ProductModel.find({ categoriesIds: { $in: [id] } });
    //   */
    //   // temporary
    //   data.products = (await ProductModel.find({})).filter(product => product.categoriesIds.includes(id));

    //   if(searchOptions.includeTop3Products) {
    //     data.products = data.products.sort((a,b) => b.totalRating - a.totalRating).slice(0,3);
    //   }
    // }
    
    return data;
  }

  public async update(entity: ICategory): Promise<boolean> {
    const data: ICategory | null = await CategoryModel.findOneAndUpdate(
      { _id: entity._id },
      entity as Category,
    );
    return data ? true : false;
  }

  public async delete(entity: ICategory): Promise<boolean> {
    const data = await CategoryModel.deleteOne({ _id: entity._id });
    return data ? true : false;
  }

  public async create(entity: ICategory): Promise<ICategory> {
    const data: ICategory = await new CategoryModel(entity).save();
    return data;
  }

  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await CategoryModel.find();
    return data;
  }
}
