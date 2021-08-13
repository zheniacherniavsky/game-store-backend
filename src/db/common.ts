import { CategoryModel } from "./models/category"
import { ProductModel } from "./models/product"

export const dbLog = (operation: string, msg: string) => console.log(`MongoDB [${operation}]: ${msg}`);

export const init = () => {
  CategoryModel.find().then((categories) => {
    if (categories.length === 0) {
      dbLog(
        'Initialization',
        'No categories found, creating default categories with products...',
      );

      const shooter = new CategoryModel({ displayName: 'Shooter' });
      const arcade = new CategoryModel({ displayName: 'Arcade' });
      const board = new CategoryModel({ displayName: 'Board' });
      shooter.save();
      arcade.save();
      board.save();

      new ProductModel({
        displayName: 'Battlefield 4',
        categoryIds: [shooter._id, arcade._id],
        createdAt: new Date().toString(),
        totalRating: 8,
        price: 29,
      }).save();

      new ProductModel({
        displayName: 'Chess',
        categoryIds: [board._id],
        createdAt: new Date(),
        totalRating: 8,
        price: 0,
      }).save();

      dbLog('Initialization', 'Data initialized!');
    }
  });
}