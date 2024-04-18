import 'knex';

declare module 'knex' {
  namespace Knex {
    interface QueryBuilder {
      paginate(options: {
        pageSize?: number;
        pageIndex?: number;
        isFromStart?: boolean;
        isLengthAware?: boolean;
      }): QueryBuilder;
    }
  }
}
