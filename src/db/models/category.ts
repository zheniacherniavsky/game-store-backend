import { getModelForClass, prop } from "@typegoose/typegoose";

export class Category {
  @prop()
  public displayName: string;
}

export const CategoryModel = getModelForClass(Category);