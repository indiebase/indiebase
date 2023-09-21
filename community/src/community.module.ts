import { MetaService } from '~/db/meta/meta.service';
import { Logger, Module, ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { ProbeModule } from './probe';
import { InitializeDepsModule } from './deps.module';
import { IsEntityExistedConstraint, KnexEx } from '@indiebase/server-shared';
import { InjectKnexEx } from '@indiebase/nest-knex';

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
    ) {}
    async onModuleInit() {
      const s = await this.knexEx.schema.hasSchema();
      console.log(s);
      // await this.metaService.init();
    }
  }

  return CommunityModule as any;
};
