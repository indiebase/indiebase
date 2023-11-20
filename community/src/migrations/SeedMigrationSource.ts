import { Knex } from 'knex';
import { v001_mgr_seed } from './v1/v001.mgr_seed';

export class SeedMigrationSource implements Knex.MigrationSource<any> {
  #schema: string;

  constructor(schema?: string) {
    this.#schema = schema ?? 'mgr';
  }

  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want, they will be passed as
  // arguments to getMigrationName and getMigration
  getMigrations() {
    // In this run we are just returning migration names
    return Promise.resolve(['v001_mgr_seed']);
  }

  getMigrationName(migration: any) {
    return migration;
  }

  async getMigration(migration: any) {
    switch (migration) {
      case 'v001_mgr_seed':
        return v001_mgr_seed(this.#schema);
    }
  }
}
