import { Knex } from 'knex';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';
import { AccountStatus, OrgStatus, ProjectStatus } from '@indiebase/trait';

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
            .string('github_org')
            .unique()
            .comment(
              'Github Organization, Indiebase projects manager depends on the github',
            );
          table
            .string('homepage')
            .unique()
            .nullable()
            .comment('Organization homepage');
          table
            .enum('status', Object.keys(OrgStatus), {
              useNative: true,
              enumName: 'status',
            })
            .defaultTo(OrgStatus.active)
            .comment('Organization status');
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

          table.integer('pinned_order').comment('Project card pinned order');
          table.boolean('pinned').comment('Pin the project');
          table
            .enum('project_status', Object.keys(ProjectStatus))
            .defaultTo(ProjectStatus.wip)
            .comment('Project status');
          table
            .string('package_name')
            .unique()
            .comment('Fallback package name');
          table.timestamps(true, true);
          table.string('cover_url').comment('Project card cover url');

          table
            .string('github_repo')
            .unique()
            .comment('Project github repository');

          table
            .integer('org_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.orgs}`);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.projects);
        });

      /**
       * ib_roles
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.roles, (table) => {
          table.increments('id').primary();
          table.string('name').notNullable();
          table.json('permissions').notNullable();
          table.timestamps(true, true);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.roles);
        });

      /**
       * ib_hackers
       */
      await knex.schema
        .withSchema(schema)
        .createTable(MgrMetaTables.hackers, (table) => {
          table.increments('id').primary();
          // table.string('username').index().notNullable();
          table.string('email').index().notNullable();
          table.string('nickname').comment('Nickname');
          table.string('avatar_url').comment('User avatar url');
          table.string('bio').comment('User biography');
          table.string('password');
          table.boolean('enabled_otp').comment('Enable 2FA');
          table.string('opt_secret').comment('One time password secret');
          table
            .enum('account_status', Object.keys(AccountStatus))
            .defaultTo(AccountStatus.active);
          table
            .string('github_username')
            .comment('Github username not nickname');

          table
            .string('opt_recovery_codes')
            .comment('simple-array OPT recovery codes');
          table.timestamps(true, true);
          table
            .integer('org_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.orgs}`);
          table
            .integer('project_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.projects}`);

          table
            .integer('role_id')
            .unsigned()
            .index()
            .references('id')
            .inTable(`mgr.${MgrMetaTables.roles}`);
        })
        .then(async () => {
          await knexExSchema.createUpdatedAtTrigger(MgrMetaTables.hackers);
        });
    },
    async down(_knex: Knex) {},
  };
};
