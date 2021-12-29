import { validateAccountAuthInfo } from '../../src/helpers/validation';

test('Throws error when username is undefined or empty', () => {
  expect(() => {
    validateAccountAuthInfo({
      username: '',
      password: 'password',
    });
  }).toThrowError();
});

test('Throws error when password is undefined or empty', () => {
  expect(() => {
    validateAccountAuthInfo({
      username: 'hello',
      password: '',
    });
  }).toThrowError();
});

test('Throws error when password dont have big letter', () => {
  expect(() => {
    validateAccountAuthInfo({
      username: 'hello',
      password: 'qwery123!2',
    });
  }).toThrowError();
});

test('Throws error when password dont have letters', () => {
  expect(() => {
    validateAccountAuthInfo({
      username: 'hello',
      password: '12312322',
    });
  }).toThrowError();
});

test('Throws error when password dont have numbers', () => {
  expect(() => {
    validateAccountAuthInfo({
      username: 'hello',
      password: 'asdasdasd',
    });
  }).toThrowError();
});

test('Throws error when password length less then 8', () => {
  expect(() => {
    validateAccountAuthInfo({
      username: 'hello',
      password: 'Qwe123',
    });
  }).toThrowError();
});

test('Returns undefined when auth credentials is correct', () => {
  expect(
    validateAccountAuthInfo({
      username: 'hello',
      password: 'Qwerty12345',
    })
  ).toBeUndefined();
});
