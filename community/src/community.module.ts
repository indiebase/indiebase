import { MetaService } from '~/db/meta/meta.service';
import { Logger, Module, ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { ProbeModule } from './probe';
import { InitializeDepsModule } from './deps.module';
import { IsEntityExistedConstraint, KnexEx } from '@indiebase/server-shared';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { Knex } from 'knex';
import { MigrationSource } from './migrations/MigrationSource';

/**
 * This module is the basic module of Lets, which contains the basic function of Community:
 *
 * @param {NonNullable<ModuleMetadata>} options
 */
export const createCommunityModule = function (
  options: NonNullable<ModuleMetadata> = {},
) {
  @Module({
    imports: [ProbeModule, ...options.imports, InitializeDepsModule],
    providers: [
      Logger,
      IsEntityExistedConstraint,
      MetaService,
      ...(options.providers ?? []),
    ],
  })
  class CommunityModule implements OnModuleInit {
    constructor(
      private readonly metaService: MetaService,
      @InjectKnexEx()
      private readonly knexEx: KnexEx,
      @InjectKnex()
      private readonly knex: Knex,
    ) {}
    async onModuleInit() {
      // const s = await this.knexEx.schema.hasSchema();
      // console.log(s);
      // if (!(await this.knexEx.schema.hasSchema('demo'))) {
      //   await this.knex.schema.createSchema('demo');
      // }
      // await this.metaService.init();
      await this.knex.migrate.up({
        migrationSource: new MigrationSource('demo'),
        tableName: 'knex_demo_migration',
        schemaName: 'demo',
      });
    }
  }

  return CommunityModule as any;
};
