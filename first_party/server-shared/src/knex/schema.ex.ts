import { Knex } from 'knex';

export class KnexSchemaEx {
  constructor(private readonly knex: Knex) {}

  list(select: string = '*') {
    return this.knex.select(select).from('information_schema.schemata');
  }
}
