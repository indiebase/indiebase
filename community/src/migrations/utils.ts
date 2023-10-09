import { type Knex } from 'knex';

export const createUpdatedAtTrigger = (
  knex: Knex,
  table: string,
  schema: string = 'public',
) =>
  knex.raw(
    `
      CREATE TRIGGER ${schema}_${table}_updated_at
      BEFORE UPDATE ON ${schema}.${table}
      FOR EACH ROW
      EXECUTE PROCEDURE ${schema}.on_update_timestamp();
    `,
  );
