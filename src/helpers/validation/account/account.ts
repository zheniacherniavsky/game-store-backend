import { checkPassword } from '../fields/password';

interface IValidateAuthInfo {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export const validateAccount = (data: IValidateAuthInfo): void => {
  const errors: string[] = [];

  if (!data.username) errors.push('username is invalid!');

  if (!data.password) errors.push('password is invalid!');
  else {
    const error = checkPassword(data.password);
    if (error) errors.push(error);
  }

  if (!data.firstName) errors.push('firstName is invalid!');
  if (!data.lastName) errors.push('lastName is invalid!');

  if (errors.length !== 0) {
    throw {
      message: errors,
      status: 400,
    };
  }
};
