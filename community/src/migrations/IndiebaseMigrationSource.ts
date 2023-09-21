import { Knex } from 'knex';
import * as dash_001 from './v1/dash.001';

export class IndiebaseMigrationSource implements Knex.MigrationSource<any> {
  getMigrations() {
    return Promise.resolve(['dash_001']);
  }

  getMigrationName(migration: any) {
    return migration;
  }

  async getMigration(migration: any) {
    switch (migration) {
      case 'dash_001':
        return dash_001;
    }
  }
}
