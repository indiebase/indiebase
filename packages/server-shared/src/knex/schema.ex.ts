import { Knex } from 'knex';

export class KnexSchemaEx {
  private schemaName!: string;

  constructor(private readonly knex: Knex) {}

  private ON_UPDATE_TIMESTAMP_FUNCTION() {
    return `
  CREATE OR REPLACE FUNCTION ${this.schemaName}.on_update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
  $$ language 'plpgsql'`;
  }

  private DROP_ON_UPDATE_TIMESTAMP_FUNCTION() {
    return `DROP FUNCTION ${this.schemaName}.on_update_timestamp`;
  }

  /**
   * Init some preset functions;
   * @returns
   */
  public async initBuiltinFuncs() {
    await this.knex.raw(this.ON_UPDATE_TIMESTAMP_FUNCTION());

    return this;
  }

  public createUpdatedAtTrigger = (tableName: string) => {
    this.knex.raw(
      `
      CREATE TRIGGER ${this.schemaName}_${tableName}_updated_at
      BEFORE UPDATE ON ${this.schemaName}.${tableName}
      FOR EACH ROW
      EXECUTE PROCEDURE ${this.schemaName}.on_update_timestamp();
    `,
    );
  };

  public withSchema(schema: string) {
    this.schemaName = schema;
    return this;
  }
}
