import { InjectKnex } from '@indiebase/nest-knex';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { IndiebaseMigrationSource } from '~/migrations/MgrMigrationSource';

@Injectable()
export class MetaService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  public async init() {
    await this.knex.migrate.latest({
      migrationSource: new IndiebaseMigrationSource(),
      tableName: 'knex_indiebase_migration',
      schemaName: 'mgr',
    });
  }
}
