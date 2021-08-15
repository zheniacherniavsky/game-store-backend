import { connectMongoDb } from './db/mongodb';
import { connectPostgreSQL } from './db/postgresql';
import { ProductDA } from './ProductDA';

let connect: () => void;

switch (process.env.CURRENT_DB) {
  case 'pg':
    connect = connectPostgreSQL;
    break;
  case 'mongo':
  default:
    connect = connectMongoDb;
    break;
}

const database = {
  connect,
};

export { database, ProductDA };
