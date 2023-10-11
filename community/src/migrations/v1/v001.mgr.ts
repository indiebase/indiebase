import { Knex } from 'knex';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';

export const v001_mgr = async function (
  schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      const knexEx = new KnexEx(knex);
      const knexExSchema = await knexEx.schema
        .withSchema(schema)
        .initBuiltinFuncs();

      /**
       * ib_orgs
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.orgs, (table) => {
          table.increments('id').primary();
          table.string('name');
          table.timestamps(true, true);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.orgs);
        });

      /**
       * ib_projects
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.projects, (table) => {
          table.increments('id').primary();
          table
            .integer('org_id')
            .unsigned()
            .index()
            .notNullable()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.orgs}`);

          table.string('name');
          table.timestamps(true, true);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.projects);
        });

      // /**
      //  * ib_users
      //  */
      // await knex.schema
      //   .withSchema(schema)
      //   .createTable(MgrMetaTables.users, (table) => {
      //     table.increments('id').primary();
      //   });

      // /**
      //  * ib_roles
      //  */
      // await knex.schema
      //   .withSchema(schema)
      //   .createTable(MgrMetaTables.roles, (table) => {
      //     table.increments('id').primary();
      //   });
    },
    async down(knex: Knex) {},
  };
};
