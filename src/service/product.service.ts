import { ProductDA } from "../DA";
import { IProduct } from "../types/types";

export class ProductService {

  constructor(private productDA: ProductDA) { }
  
  public async GetProducts() {
    try {
      const data = await this.productDA.getAll();
      return data;
    }
    catch (err) {
      console.log(err);
      return null
    }
  }
}