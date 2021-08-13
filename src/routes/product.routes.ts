import { Router, Request, Response } from "express";
import { ProductService } from "../service";

export const ProductRouter = (router: Router, service: ProductService): void => {
  router.get('/products', async (req: Request, res: Response) => {
    try {
      const products = await service.GetProducts();
      res.status(200).send(products);
    }
    catch (err) {
      res.status(500).send("Error getting products");
    }
  })
}