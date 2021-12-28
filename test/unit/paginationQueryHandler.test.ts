import { paginationQueryHandler } from '../../src/helpers/queryHandler/pagination';

test('Returns initial value for pagination', () => {
  expect(paginationQueryHandler({})).toStrictEqual({
    typegooseOptions: {
      pagination: {
        skip: 0,
        limit: 10,
      },
    },
    typeOrmOptions: {
      skip: 0,
      take: 10,
    },
  });
});

test('Returns pagination with correct offset', () => {
  expect(paginationQueryHandler({ offset: '5' })).toStrictEqual({
    typegooseOptions: {
      pagination: {
        skip: 5,
        limit: 10,
      },
    },
    typeOrmOptions: {
      skip: 5,
      take: 10,
    },
  });
});

test('Returns pagination with correct offset and limit', () => {
  expect(paginationQueryHandler({ offset: '5', limit: '1' })).toStrictEqual({
    typegooseOptions: {
      pagination: {
        skip: 5,
        limit: 1,
      },
    },
    typeOrmOptions: {
      skip: 5,
      take: 1,
    },
  });
});
