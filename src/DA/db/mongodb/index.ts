import mongoose from 'mongoose';
import { ICategory } from '../../../types/types';
import { CategoryModel } from './models/category';
import { ProductModel } from './models/product';
import logger from '../../../helpers/logger';

export const connectMongoDb = (): void => {
  const connectionString: string = process.env.MONGODB_CONNECTION_STRING || '';

  if(process.env.TS_NODE_DEV) {
    mongoose.set("debug", true);
  }

  if (connectionString !== '') {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on('error', (err) => {
      logger.log({
        level: "error",
        message: "MongoDB: " + err.message
      });
    });
    db.once('open', () => {
      logger.log({
        level: 'info',
        message: 'Connected to MongoDB',
      });
      init();
    });
  } else {
    logger.log({
      level: 'error',
      message:
        'MongoDB: process.env.MONGODB_CONNECTION_STRING is undefined. Not connected to database.',
    });
  }
};

function init(): void {
  CategoryModel.find().then((categories: ICategory[]) => {
    if (categories.length === 0) {
      logger.log({
        level: 'info',
        message:
          'MongoDB initialization - no categories found, creating default categories with products...',
      });

      const shooter = new CategoryModel({ displayName: 'Shooter' });
      const arcade = new CategoryModel({ displayName: 'Arcade' });
      const board = new CategoryModel({ displayName: 'Board' });

      shooter.save();
      arcade.save();
      board.save();

      new ProductModel({
        displayName: 'Battlefield 4',
        categoriesIds: [shooter._id.toString(), arcade._id.toString()],
        createdAt: new Date(),
        totalRating: 8,
        price: 29,
      }).save();

      new ProductModel({
        displayName: 'Battlefield 1',
        categoriesIds: [shooter._id.toString(), arcade._id.toString()],
        createdAt: new Date(),
        totalRating: 5,
        price: 29,
      }).save();

      new ProductModel({
        displayName: 'Battlefield 2',
        categoriesIds: [shooter._id.toString(), arcade._id.toString()],
        createdAt: new Date(),
        totalRating: 9,
        price: 29,
      }).save();

      new ProductModel({
        displayName: 'Chess',
        categoriesIds: [shooter._id.toString()],
        createdAt: new Date(),
        totalRating: 8,
        price: 0,
      }).save();

      logger.log({
        level: 'info',
        message: 'MongoDB initialization - data initialized!',
      });
    }
  });
}
