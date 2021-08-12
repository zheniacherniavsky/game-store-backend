import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Date, ObjectId } from "mongoose";

class Product
{
  @prop()
  public displayName: string;

  @prop()
  public categoryIds: ObjectId

  @prop()
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;
}

export default getModelForClass(Product)