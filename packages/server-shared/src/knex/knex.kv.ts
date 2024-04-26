import { Knex } from 'knex';

export class KnexKV {
  private schema: Knex.SchemaBuilder;
  private schemaName!: string;

  constructor(private readonly knex: Knex) {
    this.schema = knex.schema;
  }

  public withSchema(schema: string) {
    this.schema = this.knex.schema.withSchema(schema);
    this.schemaName = schema;
    return this;
  }
}
