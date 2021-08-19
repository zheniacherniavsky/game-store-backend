import { Result } from '.';
import { IProduct } from '../../types/types';

export const validateProduct = (product: IProduct): Result => {
  if (!product.displayName)
    return {
      isValid: false,
      error: 'displayName is invalid!',
    };
  if (isNaN(product.price))
    return {
      isValid: false,
      error: 'price is invalid!',
    };

  if (
    isNaN(product.totalRating) ||
    product.totalRating < 0 ||
    product.totalRating > 10
  )
    return {
      isValid: false,
      error: 'totalRating is invalid!',
    };

  return {
    isValid: true,
    error: '',
  };
};
