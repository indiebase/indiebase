import { Knex } from 'knex';
import { KnexSchemaEx, TmplMetaTables } from '@indiebase/server-shared';
import { AvailableOAuthProviders } from '@indiebase/sdk';

export const oauthInfoTableV1 = async (
  knex: Knex,
  knexExSchema: KnexSchemaEx,
  schema: string,
) => {
  /**
   * ib_oauth_info
   */
  return knex.schema
    .withSchema(schema)
    .createTable(TmplMetaTables.oauthUserInfo, (table) => {
      table.increments('id').primary();
      table
        .enum('provider', Object.values(AvailableOAuthProviders))
        .notNullable();
      table.string('access_token').notNullable();
      table.string('refresh_token');
      table
        .jsonb('extra_payload')
        .comment('Extra info get from oauth provider');
      table
        .integer('user_id')
        .unsigned()
        .index()
        .references('id')
        .inTable(`${schema}.${TmplMetaTables.users}`)
        .comment('The user id');

      table.timestamps(true, true);
    })
    .then(async () => {
      await knexExSchema.createUpdatedAtTrigger(TmplMetaTables.oauthUserInfo);
    });
};
