import { TmplMetaTables } from '@indiebase/server-shared';
import knex, { Knex } from 'knex';

/**
 * Create organization template tables
 *
 * @param schema
 * @returns
 */
export const v001_tmpl = async function (
  schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      await knex.schema
        .withSchema(schema)
        .createTable(TmplMetaTables.users, (table) => {
          table.increments('id').primary();
          table.string('name');
          table.timestamps(true, true);
        });
      await knex.schema
        .withSchema(schema)
        .createTable(TmplMetaTables.users, (table) => {
          table.increments('id').primary();
          table.string('name');
          table.timestamps(true, true);
        });
    },
    async down(knex: Knex) {},
  };
};
