import { IAccountRepository, ICategoryRepository, ILastRatingRepository, IProductRepository } from '../types/types';
import { connectMongoDb } from './db/mongodb';
import { connectPostgreSQL } from './db/postgresql';
import AccountTypegooseRepository from './repositories/account/accountTypegooseRepository';
import AccountTypeOrmRepository from './repositories/account/accountTypeOrmRepository';
import CategoryTypegooseRepository from './repositories/category/categoryTypegooseRepository';
import CategoryTypeOrmRepository from './repositories/category/categoryTypeOrmRepository';
import LastRatingTypegooseRepository from './repositories/lastRatings/lastRatingTypegooseReporitory';
import LastRatingTypeOrmRepository from './repositories/lastRatings/lastRatingTypeOrmRepository';
import ProductTypegooseRepository from './repositories/product/productTypegooseRepository';
import ProductTypeOrmRepository from './repositories/product/productTypeOrmRepository';

let ProductRepository: IProductRepository;
let CategoryRepository: ICategoryRepository;
let AccountRepository: IAccountRepository;
let LastRatingRepository: ILastRatingRepository;

const database = {
  connect,
};

async function connect(): Promise<void> {
  if (process.env.CURRENT_DB === 'pg') {
    await connectPostgreSQL();
    ProductRepository = new ProductTypeOrmRepository();
    CategoryRepository = new CategoryTypeOrmRepository();
    AccountRepository = new AccountTypeOrmRepository();
    LastRatingRepository = new LastRatingTypeOrmRepository();
  } else if (process.env.CURRENT_DB === 'mongo') {
    await connectMongoDb();
    ProductRepository = new ProductTypegooseRepository();
    CategoryRepository = new CategoryTypegooseRepository();
    AccountRepository = new AccountTypegooseRepository();
    LastRatingRepository = new LastRatingTypegooseRepository();
  }
}

export { database, ProductRepository, CategoryRepository, AccountRepository, LastRatingRepository };
