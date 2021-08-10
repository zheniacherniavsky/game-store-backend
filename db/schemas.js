const mongoose = require('mongoose');

const Product = new mongoose.Schema({
  displayName: String,
  categoryIds: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  createdAt: Date,
  totalRating: Number,
  price: Number,
});

const Category = new mongoose.Schema({
  displayName: String,
});

module.exports.Product = mongoose.model('Product', Product);
module.exports.Category = mongoose.model('Category', Category); 