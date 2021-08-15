import mongoose from 'mongoose';
import { ICategory } from '../../../types/types';
import { CategoryModel } from './models/category';
import { ProductModel } from './models/product';
import { dbLog } from '../common';

export const connectMongoDb = (): void => {
  const connectionString: string = process.env.MONGODB_CONNECTION_STRING || '';

  if (connectionString !== '') {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      dbLog('Connection', 'Connected to MongoDB');
      init();
    });
  } else {
    dbLog(
      'Connection',
      'process.env.MONGODB_CONNECTION_STRING is undefined. Not connected to database.',
    );
  }
};

function init(): void {
  CategoryModel.find().then((categories: ICategory[]) => {
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
        createdAt: new Date(),
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
