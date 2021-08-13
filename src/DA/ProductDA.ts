import { Product, ProductModel } from "./models/product";
import { IDatabaseOperations } from "./../types/types"

export class ProductDA implements IDatabaseOperations<Product>
{
  public async getAll() : Promise<Product[]> {
    try
    {
      const products : Product[] = await ProductModel.find();
      return products;
    }
    catch (err) {
      throw err
    }
  }
}
