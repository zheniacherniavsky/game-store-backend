import express from 'express';
import database from "./db";
import { ProductDA } from "./DA";
import { ProductRouter } from "./routes/product.routes";
import { ProductService } from "./service";
const app = express();
const port = 3000;

database.connect();

const router = express.Router();
app.use('/', router)

ProductRouter(router, new ProductService(new ProductDA));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  database.init();
});