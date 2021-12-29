import { ILike, MoreThanOrEqual, Between } from 'typeorm';
import { productSearchQueryHandler } from '../../src/helpers/queryHandler';
import { ResponseError } from '../../src/middlewares/errorHandler';

test('Returns initial value for product search query params', () => {
  expect(productSearchQueryHandler()).toStrictEqual({
    typegooseOptions: {
      find: {},
      sort: {},
    },
    typeOrmOptions: {
      where: {},
      order: {},
    },
  });
});

test('Returns search properties with 1 search query param', () => {
  const searchValue = 'Game';
  expect(productSearchQueryHandler({ displayName: searchValue })).toEqual({
    typegooseOptions: {
      find: {
        displayName: {
          $options: 'i',
          $regex: `.*${searchValue}.*`,
        },
      },
      sort: {},
    },
    typeOrmOptions: {
      where: {
        displayName: ILike(`%${searchValue}%`),
      },
      order: {},
    },
  });
});

test('Returns search properties with 2 search query param', () => {
  const searchValue = 'Game';
  const minRating = '3';
  expect(productSearchQueryHandler({ displayName: searchValue, minRating })).toEqual({
    typegooseOptions: {
      find: {
        displayName: {
          $options: 'i',
          $regex: `.*${searchValue}.*`,
        },
        totalRating: {
          $gte: '3',
        },
      },
      sort: {},
    },
    typeOrmOptions: {
      where: {
        displayName: ILike(`%${searchValue}%`),
        totalRating: MoreThanOrEqual(minRating),
      },
      order: {},
    },
  });
});

test('Returns search properties with 3 search query param', () => {
  const searchValue = 'Game';
  const minRating = '3';
  const price = '5:50';
  expect(productSearchQueryHandler({ displayName: searchValue, minRating, price })).toEqual({
    typegooseOptions: {
      find: {
        displayName: {
          $options: 'i',
          $regex: `.*${searchValue}.*`,
        },
        totalRating: {
          $gte: '3',
        },
        price: {
          $gte: 5,
          $lte: 50,
        },
      },
      sort: {},
    },
    typeOrmOptions: {
      where: {
        displayName: ILike(`%${searchValue}%`),
        totalRating: MoreThanOrEqual(minRating),
        price: Between(isNaN(5) ? 0 : 5, 50),
      },
      order: {},
    },
  });
});

test('Returns search properties with 4 search query param', () => {
  const searchValue = 'Game';
  const minRating = '3';
  const price = '5:50';
  const sortBy = 'price:desc';
  expect(productSearchQueryHandler({ displayName: searchValue, minRating, price, sortBy })).toEqual({
    typegooseOptions: {
      find: {
        displayName: {
          $options: 'i',
          $regex: `.*${searchValue}.*`,
        },
        totalRating: {
          $gte: '3',
        },
        price: {
          $gte: 5,
          $lte: 50,
        },
      },
      sort: [['price', -1]],
    },
    typeOrmOptions: {
      where: {
        displayName: ILike(`%${searchValue}%`),
        totalRating: MoreThanOrEqual(minRating),
        price: Between(isNaN(5) ? 0 : 5, 50),
      },
      order: {
        price: 'DESC',
      },
    },
  });
});

test('Throws error when minRating is not a number', () => {
  const minRating = 'hello';
  expect(() => {
    productSearchQueryHandler({ minRating });
  }).toThrow(ResponseError);
});

test('Throws error when price is not formatted', () => {
  const price = '15';
  expect(() => {
    productSearchQueryHandler({ price });
  }).toThrow(ResponseError);
});

test('Throws error when sortBy is not formatted', () => {
  const sortBy = '15';
  expect(() => {
    productSearchQueryHandler({ sortBy });
  }).toThrow(ResponseError);
});
