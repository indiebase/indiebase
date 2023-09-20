import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('nc_projects', (table) => {
    table.string('id', 128).primary();
    table.string('title');
    table.string('status');
    table.text('description');
    table.text('config');
    table.text('meta');
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {}
