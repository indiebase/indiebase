import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { MigrationSource } from '../../migrations/MigrationSource';

@Injectable()
export class MetaService {
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
  }
}