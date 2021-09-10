import { IAccountRepository, ICategoryRepository, IProductRepository, IRatingRepository } from '../types/types';
import { connectMongoDb } from './db/mongodb';
import { connectPostgreSQL } from './db/postgresql';
import AccountTypegooseRepository from './repositories/account/accountTypegooseRepository';
import AccountTypeOrmRepository from './repositories/account/accountTypeOrmRepository';
import CategoryTypegooseRepository from './repositories/category/categoryTypegooseRepository';
import CategoryTypeOrmRepository from './repositories/category/categoryTypeOrmRepository';
import ProductTypegooseRepository from './repositories/product/productTypegooseRepository';
import ProductTypeOrmRepository from './repositories/product/productTypeOrmRepository';
import RatingTypegooseRepository from './repositories/rating/ratingTypegooseRepository';
import RatingTypeOrmRepository from './repositories/rating/ratingTypeOrmRepository';

let ProductRepository: IProductRepository;
let CategoryRepository: ICategoryRepository;
let AccountRepository: IAccountRepository;
let RatingRepository: IRatingRepository;

const database = {
  connect,
};

async function connect(): Promise<void> {
  if (process.env.CURRENT_DB === 'pg') {
    await connectPostgreSQL();
    ProductRepository = new ProductTypeOrmRepository();
    CategoryRepository = new CategoryTypeOrmRepository();
    AccountRepository = new AccountTypeOrmRepository();
    RatingRepository = new RatingTypeOrmRepository();
  } else if (process.env.CURRENT_DB === 'mongo') {
    await connectMongoDb();
    ProductRepository = new ProductTypegooseRepository();
    CategoryRepository = new CategoryTypegooseRepository();
    AccountRepository = new AccountTypegooseRepository();
    RatingRepository = new RatingTypegooseRepository();
  }
}

export { database, ProductRepository, CategoryRepository, AccountRepository, RatingRepository };
