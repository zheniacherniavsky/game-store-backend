import { getModelForClass, prop } from "@typegoose/typegoose";

class CategorySchema {
  @prop()
  public displayName: string;
}

export default getModelForClass(CategorySchema);