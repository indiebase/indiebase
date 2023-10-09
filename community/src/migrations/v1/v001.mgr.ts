import { Knex } from 'knex';
import { createUpdatedAtTrigger } from '../utils';
import { preset } from '../preset';
import { MetaTables } from '../tables';

export const v001_mgr = async function (
  schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      (await preset(schema)).up(knex);

      await knex.schema
        .withSchema(schema)
        .createTable(MetaTables.orgs, (table) => {
          table.increments('id').primary();
        });

      await knex.schema
        .withSchema(schema)
        .createTable(MetaTables.projects, (table) => {
          table.increments('id').primary();
          table.string('name');
          table.timestamps(true, true);
          // table.foreign('id').references('ib_user.id');
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
