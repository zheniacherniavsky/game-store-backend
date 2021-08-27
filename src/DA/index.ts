import {
  IAccountRepository,
  ICategoryRepository,
  IProductRepository,
} from '../types/types';
import { connectMongoDb } from './db/mongodb';
import { connectPostgreSQL } from './db/postgresql';
import AccountTypegooseRepository from './repositories/account/accountTypegooseRepository';
import AccountTypeOrmRepository from './repositories/account/accountTypeOrmRepository';
import CategoryTypegooseRepository from './repositories/category/categoryTypegooseRepository';
import CategoryTypeOrmRepository from './repositories/category/categoryTypeOrmRepository';
import ProductTypegooseRepository from './repositories/product/productTypegooseRepository';
import ProductTypeOrmRepository from './repositories/product/productTypeOrmRepository';

let ProductRepository: IProductRepository;
let CategoryRepository: ICategoryRepository;
let AccountRepository: IAccountRepository;

const database = {
  connect,
};

async function connect(): Promise<void> {
  if (process.env.CURRENT_DB === 'pg') {
    await connectPostgreSQL();
    ProductRepository = new ProductTypeOrmRepository();
    CategoryRepository = new CategoryTypeOrmRepository();
    AccountRepository = new AccountTypeOrmRepository();
  } else if (process.env.CURRENT_DB === 'mongo') {
    await connectMongoDb();
    ProductRepository = new ProductTypegooseRepository();
    CategoryRepository = new CategoryTypegooseRepository();
    AccountRepository = new AccountTypegooseRepository();
  }
}

export { database, ProductRepository, CategoryRepository, AccountRepository };
