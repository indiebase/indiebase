import { Knex } from 'knex';
import { v001_mgr } from '~/migrations/v1/v001.mgr';

export class MigrationSource implements Knex.MigrationSource<any> {
  #schema: string;

  constructor(schema?: string) {
    this.#schema = schema ?? 'public';
  }

  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want, they will be passed as
  // arguments to getMigrationName and getMigration
  getMigrations() {
    // In this run we are just returning migration names
    return Promise.resolve(['v001_mgr']);
  }

  getMigrationName(migration: any) {
    return migration;
  }

  async getMigration(migration: any) {
    switch (migration) {
      case 'v001_mgr':
        return v001_mgr(this.#schema);
    }
  }
}
