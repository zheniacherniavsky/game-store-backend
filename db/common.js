const Category = require("./models/category")
const Product = require('./models/product');

const dbLog = (operation, msg) => console.log(`MongoDB [${operation}]: ${msg}`);

const init = () => {
  Category.find({}).then(categories => {
    if (categories.length === 0) {
      dbLog("Initialization", "No categories found, creating default categories with products...");

      const shooter = new Category({ displayName: "Shooter" })
      const arcade = new Category({ displayName: 'Arcade' })
      const board = new Category({ displayName: 'Board'})
      shooter.save();
      arcade.save();
      board.save();
      
      new Product({
        displayName: 'Battlefield 4',
        categoryIds: [
          shooter._id,
          arcade._id,
        ],
        createdAt: new Date(),
        totalRating: 8,
        price: 29,
      }).save();

      new Product({
        displayName: "Chess",
        categoryIds: [
          board._id,
        ],
        createdAt: new Date(),
        totalRating: 8,
        price: 0
      }).save();

      dbLog('Initialization', 'Data initialized!');
    }
  })
}

module.exports.init = init;
module.exports.dbLog = dbLog;