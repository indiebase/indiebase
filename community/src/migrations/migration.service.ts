import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { INDIEBASE_MGR, KnexEx } from '@indiebase/server-shared';
import { M } from '@indiebase/server-shared';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import { MgrMigrationSource } from './MgrMigrationSource';
import { MgrSeedMigrationSource } from './MgrSeedMigrationSource';

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
      migrationSource: new MgrMigrationSource(INDIEBASE_MGR),
      tableName: M._migrations,
      schemaName: INDIEBASE_MGR,
    });

    await this.knex.migrate.up({
      migrationSource: new MgrSeedMigrationSource(INDIEBASE_MGR),
      tableName: M._seedMigrations,
      schemaName: INDIEBASE_MGR,
    });
  }
}
