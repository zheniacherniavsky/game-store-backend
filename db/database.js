const mongoose = require('mongoose');
const { Product } = require('./models/product');

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/itechart');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to mongodb');
  });
}

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    Product.find({}, (err, products) => {
      if (err) {
        reject(err);
      } else {
        resolve(products);
      }
    });
  });
}

module.exports.connect = connect;
module.exports.getAllProducts = getAllProducts;