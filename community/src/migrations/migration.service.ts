import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { INDIEBASE_MGR, KnexEx } from '@indiebase/server-shared';
import { MgrTables } from '@indiebase/server-shared';
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
    if (!(await this.knexEx.hasSchema(INDIEBASE_MGR))) {
      await this.knex.schema.createSchema(INDIEBASE_MGR);
    }

    await this.knex.migrate.up({
      migrationSource: new MigrationSource(INDIEBASE_MGR),
      tableName: MgrTables._migrations,
      schemaName: INDIEBASE_MGR,
    });

    await this.knex.migrate.up({
      migrationSource: new SeedMigrationSource(INDIEBASE_MGR),
      tableName: MgrTables._seedMigrations,
      schemaName: INDIEBASE_MGR,
    });
  }
}
