interface IValidateAccount {
  username: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
}

export const validateAccount = (data: IValidateAccount): void => {
  const errors: string[] = [];

  if (data.username === undefined) errors.push('username is invalid!');
  if (data.password) {
    const password = data.password.toString();
    if (password.length < 8) errors.push('min password length is 8');

    const regex = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    );
    const match = password.toString().match(regex);
    if (!match)
      errors.push(
        'the password must consist of letters of the Latin alphabet and contain at least one capital letter and one number ',
      );
  } else if (data.password === undefined) errors.push('password is invalid!');

  if (data.firstName === undefined) errors.push('firstName is invalid!');
  if (data.lastName === undefined) errors.push('lastName is invalid!');

  if (errors.length !== 0) {
    throw {
      message: errors,
      status: 400,
    };
  }
};
