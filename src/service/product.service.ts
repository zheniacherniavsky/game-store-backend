import { ProductRepository } from '../DA';
import { IProduct } from '../types/types';

export class ProductService {
  public async GetProducts(): Promise<IProduct[] | null> {
    try {
      const data = await ProductRepository.getAll();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
