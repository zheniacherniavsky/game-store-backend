import { Result } from '.';
import { IProduct } from '../../types/types';

export const validateProduct = (product: IProduct): Result => {
  const errors: string[] = [];

  if (!product.displayName) errors.push('displayName is invalid!');
  if (isNaN(product.price)) errors.push('price is invalid!');
  if (isNaN(product.totalRating)) errors.push('totalRating is invalid!');

  if (product.totalRating < 0 || product.totalRating > 10) errors.push('totalRating should be in the range from 0 to 10!');

  return { errors };
};
