import { validateProduct } from './product';

export type Result = {
  isValid: boolean;
  error: string;
};

export { validateProduct };
