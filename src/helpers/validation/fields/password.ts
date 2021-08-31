export const checkPassword = (password: string): string => {
  if (password.length < 8) return 'min password length is 8';

  const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
  const match = password.toString().match(regex);
  if (!match)
    return 'the password must consist of letters of the Latin alphabet and contain at least one capital letter and one number ';

  return '';
};
