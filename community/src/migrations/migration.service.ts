import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { IbMetaTables } from '@indiebase/server-shared';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import { MigrationSource } from './MigrationSource';
import { SeedMigrationSource } from './SeedMigrationSource';

@Injectable()
export class MigrationService {
  constructor(
    @InjectKnexEx() private readonly knexEx: KnexEx,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  /**
   * Initialize manager tables.
   */
  public async initIndiebaseMgr() {
    if (!(await this.knexEx.hasSchema('indiebase_mgr'))) {
      await this.knex.schema.createSchema('indiebase_mgr');
    }

    await this.knex.migrate.up({
      migrationSource: new MigrationSource('indiebase_mgr'),
      tableName: IbMetaTables.migrations,
      schemaName: 'indiebase_mgr',
    });

    await this.knex.migrate.up({
      migrationSource: new SeedMigrationSource('indiebase_mgr'),
      tableName: IbMetaTables.seedMigrations,
      schemaName: 'indiebase_mgr',
    });
  }
}
