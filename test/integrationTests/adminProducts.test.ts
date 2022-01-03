import express from 'express';
import request from 'supertest';
import { AdminRouter } from '../../src/routes/admin.routes';
import { ProductRepository } from '../../src/DA';
const router = express.Router();
const app = express();
AdminRouter(router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

const TEST_PRODUCT_ID = 3;

jest.mock('../../src/DA', () => {
  const originalModule = jest.requireActual('../../src/DA');

  return {
    ...originalModule,
    ProductRepository: {
      getById: jest.fn().mockImplementation(async (id) => fakeProducts.find((product) => product._id == id) || null),
      create: jest.fn().mockImplementation(async () => {
        console.log('Product has been created');
      }),
      update: jest.fn().mockImplementation(async () => {
        console.log('Product has been updated');
        return {};
      }),
      delete: jest.fn().mockImplementation(async () => {
        console.log('Product has been deleted');
        return true;
      }),
    },
  };
});

jest.mock('../../src/middlewares', () => {
  const originalModule = jest.requireActual('../../src/DA');

  return {
    ...originalModule,
    jwtCheck: jest.fn().mockImplementation((req, res, next) => {
      next();
    }),
    adminCheck: jest.fn().mockImplementation((req, res, next) => {
      next();
    }),
  };
});

describe('Testing admin product routes', () => {
  test('GET /admin/products/{id} - success', async () => {
    const response = await request(app).get(`/admin/products/${TEST_PRODUCT_ID}`);
    expect(response.body).toEqual(fakeProducts.find((product) => product._id === TEST_PRODUCT_ID));
  });

  test('GET /admin/products/{id} - error (Not Found)', async () => {
    const response = await request(app).get(`/admin/products/${TEST_PRODUCT_ID * 1000}`);
    expect(response.statusCode).toBe(404);
  });

  test('POST /admin/products - success', async () => {
    const product = {
      displayName: 'heeloWorld',
      price: 10,
    };
    await request(app)
      .post('/admin/products')
      .type('json')
      .send(product)
      .then((res) => {
        expect(ProductRepository.create).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
      });
  });

  test('PATCH /admin/products/{id} - success', async () => {
    const product = {
      displayName: 'heeloWorld',
      price: 10,
    };
    await request(app)
      .patch('/admin/products/3')
      .type('json')
      .send(product)
      .then((res) => {
        expect(ProductRepository.update).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
      });
  });

  test('DELETE /admin/products/{id} - success', async () => {
    await request(app)
      .delete('/admin/products/3')
      .then((res) => {
        expect(ProductRepository.delete).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
      });
  });
});
