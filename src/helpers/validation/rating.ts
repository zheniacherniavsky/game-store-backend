export const validateRating = (rating?: number): void => {
  const errors: string[] = [];
  if (rating !== undefined) {
    if (isNaN(rating)) errors.push('rating is invalid!');
    if (rating < 0 || rating > 10) errors.push('rating should be in the range from 0 to 10!');
  } else errors.push('rating is invalid!');

  if (errors.length !== 0) {
    throw {
      message: errors,
      status: 400,
    };
  }
};
