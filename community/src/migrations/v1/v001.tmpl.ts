import { Knex } from 'knex';
import { createUpdatedAtTrigger } from '../utils';
import { preset } from '../preset';
import { MetaTables } from '../tables';

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
      (await preset(schema)).up(knex);

      await knex.schema
        .withSchema(schema)
        .createTable(MetaTables.projects, (table) => {
          table.increments('id').primary();
          table.string('name');
          table.timestamps(true, true);
        })
        .then(async () => {
          await createUpdatedAtTrigger(knex, 'ib_orgs', schema);
        });
    },
    async down(knex: Knex) {
      (await preset(schema)).down(knex);
    },
  };
};
