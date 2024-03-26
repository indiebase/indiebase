import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { MgrMetaTables } from '@indiebase/server-shared';
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
  public async initMgr() {
    if (!(await this.knexEx.hasSchema('mgr'))) {
      await this.knex.schema.createSchema('mgr');
    }

    await this.knex.migrate.up({
      migrationSource: new MigrationSource('mgr'),
      tableName: MgrMetaTables.migrations,
      schemaName: 'mgr',
    });

    await this.knex.migrate.up({
      migrationSource: new SeedMigrationSource('mgr'),
      tableName: MgrMetaTables.seedMigrations,
      schemaName: 'mgr',
    });
  }
}
