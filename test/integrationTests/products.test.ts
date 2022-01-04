import express from 'express';
import request from 'supertest';
import { ProductRouter } from '../../src/routes/product.routes';

const router = express.Router();
const app = express();
ProductRouter(router);

app.use('/', router);

const fakeProducts = [
  {
    _id: 2,
    displayName: 'Game 2',
    createdAt: '2021-11-28T14:18:35.153Z',
    totalRating: 2,
    price: 19,
  },
  {
    _id: 3,
    displayName: 'Game 3',
    createdAt: '2021-11-28T14:18:35.153Z',
    totalRating: 2,
    price: 19,
  },
];

jest.mock('../../src/DA', () => {
  const originalModule = jest.requireActual('../../src/DA');

  return {
    ...originalModule,
    ProductRepository: {
      getProductsList: jest.fn(() => fakeProducts),
    },
  };
});

describe('Testing product routes', () => {
  test('GET /products - success', async () => {
    const { body } = await request(app).get('/products');

    expect(body).toEqual(fakeProducts);
  });
});
