import { validateProduct } from '../../src/helpers/validation';

test('Throws error when displayName is invalid', () => {
  expect(() => {
    validateProduct({
      displayName: '',
      price: 10,
      createdAt: new Date(),
      ratings: [],
      totalRating: 0,
    });
  }).toThrowError();
});

test('Returns undefined if product is correct', () => {
  expect(
    validateProduct({
      displayName: 'Hello',
      price: 10,
      createdAt: new Date(),
      ratings: [],
      totalRating: 0,
    })
  ).toBeUndefined();
});
