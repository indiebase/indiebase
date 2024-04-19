import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { IndiebaseMetaTables } from '@indiebase/server-shared';
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
  public async initIndiebase() {
    if (!(await this.knexEx.hasSchema('indiebase'))) {
      await this.knex.schema.createSchema('indiebase');
    }

    await this.knex.migrate.up({
      migrationSource: new MigrationSource('indiebase'),
      tableName: IndiebaseMetaTables.migrations,
      schemaName: 'indiebase',
    });

    await this.knex.migrate.up({
      migrationSource: new SeedMigrationSource('indiebase'),
      tableName: IndiebaseMetaTables.seedMigrations,
      schemaName: 'indiebase',
    });
  }
}
