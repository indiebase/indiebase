import { Knex } from 'knex';

export class KnexSchemaEx {
  #schema: Knex.SchemaBuilder;

  constructor(private readonly knex: Knex) {}

  list(select: string = '*') {
    return this.knex.select(select).from('information_schema.schemata');
  }

  withSchema(schema: string) {
    this.#schema = this.knex.schema.withSchema(schema);
    return this;
  }

  createTableEx() {
    

    // this.#schema.createSchema();
  }
}
