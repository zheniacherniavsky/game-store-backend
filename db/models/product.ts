import { getModelForClass, prop } from "@typegoose/typegoose";
import { Date, ObjectId } from "mongoose";

export class Product
{
  @prop()
  public displayName: string;

  @prop()
  public categoryIds: ObjectId[]

  @prop()
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;
}

export const ProductModel = getModelForClass(Product)