import { createConnection, getRepository } from 'typeorm';
import { dbLog } from '../common';
import { Category } from './entity/category';
import { Product } from './entity/product';

export const connectPostgreSQL = async (): Promise<void> => {
  await createConnection()
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

    const category = new Category();
    category.displayName = 'Shooter';
    categoryRepository.save(category).then( async (category) => {
      const product1 = new Product();
      product1.displayName = 'Game 1';
      product1.categories = [category];
      product1.createdAt = new Date();
      product1.price = 19;
      product1.totalRating = 9;

      const product2 = new Product();
      product2.displayName = 'Game 2';
      product2.categories = [category];
      product2.createdAt = new Date();
      product2.price = 19;
      product2.totalRating = 8;

      const product3 = new Product();
      product3.displayName = 'Game 3';
      product3.categories = [category];
      product3.createdAt = new Date();
      product3.price = 19;
      product3.totalRating = 7;

      const product4 = new Product();
      product4.displayName = 'Game 4';
      product4.categories = [category];
      product4.createdAt = new Date();
      product4.price = 19;
      product4.totalRating = 6;

      const productsRepository = getRepository(Product);
      await productsRepository.save(product1);
      await productsRepository.save(product2);
      await productsRepository.save(product3);
      await productsRepository.save(product4);

      dbLog('Initialization', 'Data initialized!');
    });
  }
}
