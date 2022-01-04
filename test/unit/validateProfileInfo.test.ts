import { validateProfileInfo } from '../../src/helpers/validation';

test('Throws error when username is undefined or empty', () => {
  expect(() => {
    validateProfileInfo({
      username: '',
      firstName: 'firstName',
      lastName: 'lastName',
    });
  }).toThrowError();
});

test('Throws error when firstName is undefined or empty', () => {
  expect(() => {
    validateProfileInfo({
      username: 'username',
      firstName: '',
      lastName: 'lastName',
    });
  }).toThrowError();
});

test('Throws error when lastName is undefined or empty', () => {
  expect(() => {
    validateProfileInfo({
      username: 'username',
      firstName: 'firstName',
      lastName: '',
    });
  }).toThrowError();
});

test('Returns undefined when profile is correct', () => {
  expect(
    validateProfileInfo({
      username: 'username',
      firstName: 'firstName',
      lastName: 'lastName',
    })
  ).toBeUndefined();
});
