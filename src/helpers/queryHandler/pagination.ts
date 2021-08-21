import { QueryObject, Result } from '.';

export const paginationQueryHandler = (query?: QueryObject): Result => {
  const res: Result = {
    typegooseOptions: {
      pagination: {
        skip: 0,
        limit: 10,
      },
    },
    typeOrmOptions: {
      skip: 0,
    },
  };

  if (query === undefined) return res;

  if (query.offset !== undefined) {
    res.typegooseOptions.pagination.skip = parseInt(query.offset) || 0;
    res.typeOrmOptions.skip = parseInt(query.offset) || 0;
  }

  if (query.limit !== undefined) {
    res.typegooseOptions.pagination.limit = parseInt(query.limit);
    res.typeOrmOptions.take = parseInt(query.limit);
  }

  return res;
};
