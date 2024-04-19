import { Knex } from 'knex';

import { v001_indiebase } from './v1/v001.indiebase';

export class MigrationSource implements Knex.MigrationSource<any> {
  #schema: string;

  constructor(schema?: string) {
    this.#schema = schema ?? 'indiebase';
  }

  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want, they will be passed as
  // arguments to getMigrationName and getMigration
  getMigrations() {
    // In this run we are just returning migration names
    return Promise.resolve(['v001_indiebase']);
  }

  getMigrationName(migration: any) {
    return migration;
  }

  async getMigration(migration: any): Promise<any> {
    switch (migration) {
      case 'v001_indiebase':
        return v001_indiebase(this.#schema);
      default:
        throw new Error(`${migration} migration not found`);
    }
  }
}
