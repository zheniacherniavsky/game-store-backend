const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/itechart');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to mongodb');
  });
}

module.exports.connect = connect;