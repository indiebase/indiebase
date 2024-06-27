import { v001_tmpl_seed } from './v1/v001.tmpl-seed';
import { Knex } from 'knex';

export class TmplSeedMigrationSource implements Knex.MigrationSource<any> {
  #schema: string;

  constructor(schema: string) {
    this.#schema = schema;
  }

  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want, they will be passed as
  // arguments to getMigrationName and getMigration
  getMigrations() {
    // In this run we are just returning migration names
    return Promise.resolve(['v001_tmpl_seed']);
  }

  getMigrationName(migration: any) {
    return migration;
  }

  async getMigration(migration: any): Promise<any> {
    switch (migration) {
      case 'v001_tmpl_seed':
        return v001_tmpl_seed(this.#schema);
    }
  }
}
