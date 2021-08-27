interface signUpData {
  username: string;
  password: string;
}

export const validateAccountCredentials = (data: signUpData): void => {
  const errors: string[] = [];

  if (!data.username) errors.push('username is invalid!');
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
  } else errors.push('password is invalid!');

  if (errors.length !== 0) {
    throw {
      message: errors,
      status: 400,
    };
  }
};
