const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  displayName: String,
});

module.exports = mongoose.model('Category', Category); 