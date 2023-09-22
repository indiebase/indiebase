import { InjectKnex } from '@indiebase/nest-knex';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { MigrationSource } from '~/migrations/MigrationSource';

@Injectable()
export class MetaService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  public async init() {
    // await this.knex.migrate.latest({
    //   migrationSource: new MgrMigrationSource(),
    //   tableName: 'knex_mgr_migration',
    //   schemaName: 'public',
    // });
  }
}
