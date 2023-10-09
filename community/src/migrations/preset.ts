import { Knex } from 'knex';

const ON_UPDATE_TIMESTAMP_FUNCTION = (schema: string = 'public') => `
CREATE OR REPLACE FUNCTION ${schema}.on_update_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ language 'plpgsql'`;

const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = (schema: string = 'public') =>
  `DROP FUNCTION ${schema}.on_update_timestamp`;

export const preset = async function (schema: string): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      // Fix PostgreSQL updated_at field will not automatically be updated.
      // https://github.com/knex/knex/issues/1928
      await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION(schema));
      // await knex.schema.withSchema(schema).raw(ON_UPDATE_TIMESTAMP_FUNCTION).toSQL();
    },
    async down(knex: Knex) {
      await knex.schema
        .withSchema(schema)
        .raw(DROP_ON_UPDATE_TIMESTAMP_FUNCTION(schema));
    },
  };
};
