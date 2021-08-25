import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { database } from './DA';
database.connect();

import { ProductRouter } from './routes/product.routes';
import { CategoryRouter } from './routes/category.routes';

const port = process.env.SRV_PORT;
const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

ProductRouter(router);
CategoryRouter(router);

app.use((req, res) => {
  res.status(404);
  res.json({error: "Not found!"});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
