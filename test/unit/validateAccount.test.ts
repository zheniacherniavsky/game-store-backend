import { validateAccount } from '../../src/helpers/validation';

test('Throws error when username is undefined or empty', () => {
  expect(() => {
    validateAccount({
      username: '',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
    });
  }).toThrowError();
});

test('Throws error when password is undefined or empty', () => {
  expect(() => {
    validateAccount({
      username: 'hello',
      password: '',
      firstName: 'firstName',
      lastName: 'lastName',
    });
  }).toThrowError();
});

test('Throws error when firstName is undefined or empty', () => {
  expect(() => {
    validateAccount({
      username: 'hello',
      password: 'password',
      firstName: '',
      lastName: 'lastName',
    });
  }).toThrowError();
});

test('Throws error when lastName is undefined or empty', () => {
  expect(() => {
    validateAccount({
      username: 'hello',
      password: 'password',
      firstName: 'firstName',
      lastName: '',
    });
  }).toThrowError();
});

test('Throws error when password dont have big letter', () => {
  expect(() => {
    validateAccount({
      username: 'hello',
      password: 'qwery123!2',
      firstName: 'firstName',
      lastName: 'gena',
    });
  }).toThrowError();
});

test('Throws error when password dont have letters', () => {
  expect(() => {
    validateAccount({
      username: 'hello',
      password: '12312322',
      firstName: 'firstName',
      lastName: 'gena',
    });
  }).toThrowError();
});

test('Throws error when password dont have numbers', () => {
  expect(() => {
    validateAccount({
      username: 'hello',
      password: 'asdasdasd',
      firstName: 'firstName',
      lastName: 'gena',
    });
  }).toThrowError();
});

test('Throws error when password length less then 8', () => {
  expect(() => {
    validateAccount({
      username: 'hello',
      password: 'Qwe123',
      firstName: 'firstName',
      lastName: 'gena',
    });
  }).toThrowError();
});

test('Returns undefined when account is correct', () => {
  expect(
    validateAccount({
      username: 'hello',
      password: 'Qwerty12345',
      firstName: 'firstName',
      lastName: 'gena',
    })
  ).toBeUndefined();
});
