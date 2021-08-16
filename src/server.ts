import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { database } from './DA';
database.connect();

import { ProductRouter } from './routes/product.routes';
import { ProductService } from './service';

const port = process.env.SRV_PORT;
const app = express();
const router = express.Router();
app.use('/', router);

ProductRouter(router, new ProductService());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
