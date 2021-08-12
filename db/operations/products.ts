import Product from "../models/product";

export const getAll = async () => {
  const products = await Product.find({});
  return products;
}