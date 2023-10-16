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
          table.string('name').unique().index().notNullable();
          table.string('description');
          table.string('contact_email').comment('Organization contact email');
          table.string('avatar_url').comment('Organization avatar url');
          table
            .string('githubOrg')
            .unique()
            .comment(
              'Github Organization, Indiebase projects manager depends on the github',
            );
          table
            .string('homepage')
            .unique()
            .nullable()
            .comment('Organization homepage');
          table.enum('status', [], { useNative: true, enumName: 'status' });

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
          table.string('name').unique().index().notNullable();
          table.string('contact_email').comment('Project contact email');
          table.string('avatar_url').comment('Project avatar url');
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

      /**
       * ib_users
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.users, (table) => {
          table.increments('id').primary();
          // table.string('username').index().notNullable();
          table.string('email').index().notNullable();
          table.string('nickname').comment('Nickname');
          table.string('avatar_url').comment('User avatar url');
          table.string('bio').comment('User biography');
          table.string('password');
          table.boolean('enabled_otp').comment('Enable 2FA');
          table.string('opt_secret').comment('One time password secret');
          table.enum('account_status', []);

          table
            .string('github_username')
            .comment('Github username not nickname');

          table
            .string('opt_recovery_codes')
            .comment('simple-array OPT recovery codes');
          table.timestamps(true, true);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.projects);
        });

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
