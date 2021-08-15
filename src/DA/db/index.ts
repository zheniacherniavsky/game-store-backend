import { connectMongoDb } from './mongodb';
import { connectPostgreSQL } from './postgresql';

const database = {
  connect: connectPostgreSQL,
};

export default database;
