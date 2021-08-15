import {connectMongoDb, init} from "./common";

const database = {
  connect: connectMongoDb,
  init
};

export default database;