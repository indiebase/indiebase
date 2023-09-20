import { Knex } from 'knex';
// import second from 'first'

export class IndieMigrationSource implements Knex.MigrationSource<any> {
  getMigrations() {
    return Promise.resolve(['migration1']);
  }

  getMigrationName(migration: any) {
    return migration;
  }

  async getMigration(migration: any) {
    switch (migration) {
      case 'migration1':
        return {
          async up(knex: Knex) {
            return '';
          },
          async down(knex: Knex) {
            return '';
          },
        };
    }
  }
}
