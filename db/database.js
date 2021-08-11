const mongoose = require('mongoose');
const { dbLog, init } = require('./common');

const connectMongoDb = () => {
  mongoose.connect('mongodb://localhost:27017/itechart');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    dbLog('Connection', 'Connected to MongoDB');
  });
}

module.exports.connect = connectMongoDb;
module.exports.init = init;
module.exports.products = require('./operations/products');