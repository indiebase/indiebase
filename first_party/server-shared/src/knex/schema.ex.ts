import { Knex } from 'knex';

export class KnexSchemaEx {
  private schema: Knex.SchemaBuilder;

  constructor(private readonly knex: Knex) {}

  list(select: string = '*') {
    return this.knex.select(select).from('information_schema.schemata');
  }

  withSchema(schema: string) {
    this.schema = this.knex.schema.withSchema(schema);
    return this;
  }

  /**
   *
   *
   * Steps of synchronize works:
   * 1. load list of all tables with complete column and keys information from the db
   * 2. drop all (old) foreign keys that exist in the table, but does not exist in the metadata
   * 3. create new tables that does not exist in the db, but exist in the metadata
   * 4. drop all columns exist (left old) in the db table, but does not exist in the metadata
   * 5. add columns from metadata which does not exist in the table
   * 6. update all exist columns which metadata has changed
   * 7. update primary keys - update old and create new primary key from changed columns
   * 8. create foreign keys which does not exist in the table yet
   * 9. create indices which are missing in db yet, and drops indices which exist in the db, but does not exist in the metadata anymore
   */
  createTableEx() {
    // this.#schema.createSchema();
  }
}
