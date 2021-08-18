import { ObjectId } from 'mongoose';
import { ICategoryRepository, IProductRepository } from '../types/types';
import { connectMongoDb } from './db/mongodb';
import { connectPostgreSQL } from './db/postgresql';
import CategoryTypegooseRepository from './repositories/category/categoryTypegooseRepository';
import CategoryTypeOrmRepository from './repositories/category/categoryTypeOrmRepository';
import ProductTypegooseRepository from './repositories/product/productTypegooseRepository';
import ProductTypeOrmRepository from './repositories/product/productTypeOrmRepository';

let ProductRepository: IProductRepository<string | ObjectId>;
let CategoryRepository: ICategoryRepository<string | ObjectId>;

const database = {
  connect,
};

async function connect(): Promise<void> {
  if (process.env.CURRENT_DB === 'pg') {
    await connectPostgreSQL();
    ProductRepository = new ProductTypeOrmRepository() as IProductRepository<
      string | ObjectId
    >;
    CategoryRepository = new CategoryTypeOrmRepository() as ICategoryRepository<
      string | ObjectId
    >;
  } else if (process.env.CURRENT_DB === 'mongo') {
    await connectMongoDb();
    ProductRepository = new ProductTypegooseRepository() as IProductRepository<
      string | ObjectId
    >;
    CategoryRepository =
      new CategoryTypegooseRepository() as ICategoryRepository<
        string | ObjectId
      >;
  }
}

export { database, ProductRepository, CategoryRepository };
