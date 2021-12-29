import { validateRating } from '../../src/helpers/validation';

test('Throws error when rating is undefined', () => {
  expect(() => {
    validateRating();
  }).toThrowError();
});

test('Throws error when rating more then 10', () => {
  expect(() => {
    validateRating(11);
  }).toThrowError();
});

test('Throws error when rating less then 0', () => {
  expect(() => {
    validateRating(-1);
  }).toThrowError();
});

test('Returns undefined when rating is correct', () => {
  expect(() => {
    validateRating(10);
  }).toBeUndefined;
});
