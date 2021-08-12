import mongoose from "mongoose"
import {dbLog, init} from "./common"
import * as productsOperations from "./operations/products"

const connectMongoDb = () => {
  mongoose.connect('mongodb://localhost:27017/itechart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    dbLog('Connection', 'Connected to MongoDB');
  });
}

type DatabaseType = {
  connect: () => void;
  init: () => void;
  products: any
}

const database: DatabaseType = {
  connect: connectMongoDb,
  init,
  products: productsOperations,
};

export default database