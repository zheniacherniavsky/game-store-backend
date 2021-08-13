import {Product, ProductModel} from "../models/product";

export const getAll = async () => {
  const products: Product[] = await ProductModel.find();
  return products;
}