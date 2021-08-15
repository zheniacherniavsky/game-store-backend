import { createConnection, getRepository } from 'typeorm';
import { dbLog } from '../common';
import { Category } from './entity/category';
import { Product } from './entity/product';

export const connectPostgreSQL = async (): Promise<void> => {
  createConnection()
    .then(() => {
      dbLog('Connection', 'Connected to PostgreSQL');
      init();
    })
    .catch((err) => {
      dbLog('Connection', err.message);
    });
};

async function init(): Promise<void> {
  const categoryRepository = getRepository(Category);
  const categories = await categoryRepository.find();
  if (categories.length === 0) {
    dbLog(
      'Initialization',
      'No categories found, creating default categories with products...',
    );

    let category = new Category();
    category.displayName = 'Shooter';

    category = await categoryRepository.save(category);

    const product = new Product();
    product.displayName = 'Minecraft';
    product.categoryIds = [category._id];
    product.createdAt = new Date();
    product.price = 19;
    product.totalRating = 9;

    const productsRepository = getRepository(Product);
    await productsRepository.save(product);

    dbLog('Initialization', 'Data initialized!');
  }
}
