import express from 'express';
import database from './DA/db';
import dotenv from 'dotenv';

import { ProductDA } from './DA';
import { ProductRouter } from './routes/product.routes';
import { ProductService } from './service';

dotenv.config();
const port = process.env.SRV_PORT;

const app = express();

database.connect();

const router = express.Router();
app.use('/', router);

ProductRouter(router, new ProductService(new ProductDA()));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  database.init();
});
