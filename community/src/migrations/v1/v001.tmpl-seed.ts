import { TmplTables } from '@indiebase/server-shared';
import { OAuthProvider } from '@indiebase/trait';
import { Knex } from 'knex';
import { AvailableOAuthProviders } from '@indiebase/sdk';

export const tmplOAuthProvidersV1: Partial<OAuthProvider>[] = Object.values(
  AvailableOAuthProviders,
).map((name) => ({
  name,
}));

/**
 * Create organization template tables
 *
 * @param schema
 * @returns
 */
export const v001_tmpl_seed = async function (
  schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      const knexSchema = knex.withSchema(schema);

      // Init indiebase manager's OAuth providers.
      await knexSchema
        .insert(tmplOAuthProvidersV1)
        .into(TmplTables.oauthProviders);
    },
    async down() {},
  };
};
