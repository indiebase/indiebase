import { MetaService } from '~/db/meta/meta.service';
import { Logger, Module, ModuleMetadata } from '@nestjs/common';
import { ProbeModule } from './probe';
import { InitializeDepsModule } from './deps.module';

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
      // IsEntityExistedConstraint,
      ...(options.providers ?? [MetaService]),
    ],
  })
  class CommunityModule {}

  return CommunityModule as any;
};
