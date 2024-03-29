import { Knex } from 'knex';

import { v001_tmpl } from './v1/v001.tmpl';

export class TmplMigrationSource implements Knex.MigrationSource<any> {
  #schema: string;

  constructor(schema?: string) {
    this.#schema = schema ?? 'public';
  }

  // Must return a Promise containing a list of migrations.
  // Migrations can be whatever you want, they will be passed as
  // arguments to getMigrationName and getMigration
  getMigrations() {
    // In this run we are just returning migration names
    return Promise.resolve(['v001_tmpl']);
  }

  getMigrationName(migration: any) {
    return migration;
  }

  async getMigration(migration: any) {
    switch (migration) {
      case 'v001_tmpl':
        return v001_tmpl(this.#schema);
    }
  }
}
