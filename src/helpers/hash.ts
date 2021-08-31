import bcrypt from 'bcrypt';

const saltRounds = 12;

export const hashData = async (data: string): Promise<string> => {
  const hashedData = await bcrypt.hash(data, saltRounds);
  return hashedData;
};

export const compareHashedData = async (data: string, hashedData: string): Promise<boolean> => {
  return await bcrypt.compare(data, hashedData);
};
