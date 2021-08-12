const mongoose = require('mongoose');

const Product = new mongoose.Schema({
  displayName: String,
  categoryIds: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  createdAt: Date,
  totalRating: Number,
  price: Number,
});

module.exports = mongoose.model('Product', Product);