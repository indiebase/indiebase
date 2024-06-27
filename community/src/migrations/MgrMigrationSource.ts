import { INDIEBASE_MGR } from '@indiebase/server-shared';
import { Knex } from 'knex';

import { v001_indiebase_mgr } from './v1/v001.indiebase-mgr';

export class MgrMigrationSource implements Knex.MigrationSource<any> {
  #schema: string;

  constructor(schema?: string) {
    this.#schema = schema ?? INDIEBASE_MGR;
  }

  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want, they will be passed as
  // arguments to getMigrationName and getMigration
  getMigrations() {
    // In this run we are just returning migration names
    return Promise.resolve(['v001_indiebase_mgr']);
  }

  getMigrationName(migration: any) {
    return migration;
  }

  async getMigration(migration: any): Promise<any> {
    switch (migration) {
      case 'v001_indiebase_mgr':
        return v001_indiebase_mgr(this.#schema);
      default:
        throw new Error(`${migration} migration not found`);
    }
  }
}
