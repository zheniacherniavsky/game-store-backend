import { IProduct } from '../../types/types';

export const validateProduct = (product: IProduct): void => {
  const errors: string[] = [];

  if (!product.displayName) errors.push('displayName is invalid!');
  if (isNaN(product.price)) errors.push('price is invalid!');

  if (errors.length !== 0) {
    throw {
      message: errors,
      status: 400,
    };
  }
};
