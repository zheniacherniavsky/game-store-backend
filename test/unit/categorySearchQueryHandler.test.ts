import { categorySearchQueryHandler } from '../../src/helpers/queryHandler/category';
import { ResponseError } from '../../src/middlewares/errorHandler';

test('Returns false additional category search params when argument is undefined', () => {
  expect(categorySearchQueryHandler(undefined)).toStrictEqual({
    includeProducts: false,
    includeTop3Products: false,
  });
});

test('Returns false for each additional search params when includeProducts is false', () => {
  expect(categorySearchQueryHandler({ includeProducts: 'false' })).toStrictEqual({
    includeProducts: false,
    includeTop3Products: false,
  });
});

test('Returns only includeProducts = true when includeProducts is true', () => {
  expect(categorySearchQueryHandler({ includeProducts: 'true' })).toStrictEqual({
    includeProducts: true,
    includeTop3Products: false,
  });
});

test('Returns true for each additional search params when passed arguments is correct', () => {
  expect(categorySearchQueryHandler({ includeProducts: 'true', includeTop3Products: 'top' })).toStrictEqual({
    includeProducts: true,
    includeTop3Products: true,
  });
});

test('Throws error when includesProducts is invalid', () => {
  expect(() => {
    categorySearchQueryHandler({ includeProducts: '123' });
  }).toThrow(ResponseError);
});

test('Throws error when includeTop3Products is invalid', () => {
  expect(() => {
    categorySearchQueryHandler({ includeProducts: 'true', includeTop3Products: '123' });
  }).toThrow(ResponseError);
});
