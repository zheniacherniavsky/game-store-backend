import { IResultPagination, PaginationQueryObject } from '.';

export interface IPagination {
  skip: number;
  limit: number;
}

export const paginationQueryHandler = (paginationQuery: PaginationQueryObject): IResultPagination => {
  const res: IResultPagination = {
    typegooseOptions: {
      pagination: {
        skip: 0,
        limit: 10,
      },
    },
    typeOrmOptions: {
      skip: 0,
      take: 10,
    },
  };

  if (paginationQuery === undefined) return res;

  if (paginationQuery.offset !== undefined) {
    res.typegooseOptions.pagination.skip = parseInt(paginationQuery.offset) || 0;
    res.typeOrmOptions.skip = parseInt(paginationQuery.offset) || 0;
  }

  if (paginationQuery.limit !== undefined) {
    res.typegooseOptions.pagination.limit = parseInt(paginationQuery.limit);
    res.typeOrmOptions.take = parseInt(paginationQuery.limit);
  }

  return res;
};
