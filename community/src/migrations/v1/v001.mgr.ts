import { Knex } from 'knex';

export const v001_mgr = async function (
  schema: string,
): Promise<Knex.Migration> {
  return {
    async up(knex: Knex): Promise<void> {
      await knex.schema
        .withSchema(schema)
        .createTable('ib_projects', (table) => {
          table.string('id').primary();
          table.string('title');
          table.string('status');
          table.text('description');
          table.text('config_v3');
          table.text('meta');
          table.timestamps();
          // table.foreign('id').references('ib_user.id');
        });
      // await knex.schema.withSchema(schema).createTable('ib_user', (table) => {
      //   table.string('id', 128).primary();
      //   table.string('title');
      // });
    },
    async down(knex: Knex) {},
  };
};
