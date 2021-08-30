interface IValidateProfileInfo {
  username?: string;
  firstName?: string;
  lastName?: string;
}

export const validateProfileInfo = (data: IValidateProfileInfo): void => {
  const errors: string[] = [];

  if (!data.username) errors.push('username is invalid!');
  if (!data.firstName) errors.push('firstName is invalid!');
  if (!data.lastName) errors.push('lastName is invalid!');

  if (errors.length !== 0) {
    throw {
      message: errors,
      status: 400,
    };
  }
};
