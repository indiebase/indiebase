import { did } from '@deskbtm/gadgets';
import { KNEX_SYNC } from '@indiebase/nest-knex';
import { Knex } from 'knex';

export class KnexSchemaEx {
  private schema: Knex.SchemaBuilder;
  private schemaName: string;

  constructor(private readonly knex: Knex) {
    this.schema = knex.schema;
  }

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

  public createUpdatedAtTrigger = (tableName: string) =>
    this.knex.raw(
      `
      CREATE TRIGGER ${this.schemaName}_${tableName}_updated_at
      BEFORE UPDATE ON ${this.schemaName}.${tableName}
      FOR EACH ROW
      EXECUTE PROCEDURE ${this.schemaName}.on_update_timestamp();
    `,
    );

  public withSchema(schema: string) {
    this.schema = this.knex.schema.withSchema(schema);
    this.schemaName = schema;
    return this;
  }

  /**
   * Only occurs when the column name changes.
   */
  private renameColumn() {}

  /**
   * @todo
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
  // {
  //   grouping: 'columns',
  //   builder: ColumnBuilder {
  //     _method: 'add',
  //     _single: {},
  //     _modifiers: {},
  //     _statements: [],
  //     _type: 'increments',
  //     _args: [],
  //   }
  // },
  public async createTableEx(
    tableName: string,
    callback: (
      tableBuilder: Knex.CreateTableBuilder,
    ) => Knex.CreateTableBuilder,
  ) {
    let [err, hasTable] = await did(this.schema.hasTable(tableName));

    if (err) throw err;

    if (hasTable) {
      if (globalThis[KNEX_SYNC]) {
        let t = this.knex.client.tableBuilder(
          'create',
          tableName,
          null,
          callback,
        );
        const r = callback.call(this, t);
        const newCols = r?.__statements;
        if (!newCols) return;
        const oldCols = await this.knex(tableName).columnInfo();

        return this.schema.createTable(tableName, (table) => {
          Object.assign(table, r);
        });
      }
    } else {
      return this.schema.createTable(tableName, callback);
    }
  }
}
