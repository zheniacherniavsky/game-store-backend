import { Product, ProductModel } from './db/mongodb/models/product';
import { IDatabaseModelOperations } from './../types/types';

export class ProductDA implements IDatabaseModelOperations<Product> {
  public async getAll(): Promise<Product[]> {
    const products: Product[] = await ProductModel.find();
    return products;
  }
}
