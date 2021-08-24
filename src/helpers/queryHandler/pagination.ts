import { IResultPagination, QueryObject } from '.';

export const paginationQueryHandler = (query?: QueryObject): IResultPagination => {
  const res: IResultPagination = {
    typegooseOptions: {
      pagination: {
        skip: 0,
        limit: 10,
      },
    },
    typeOrmOptions: {
      skip: 0,
      take: 20
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
