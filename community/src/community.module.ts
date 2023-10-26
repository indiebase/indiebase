import {
  IsEntityExistedConstraint,
  genDevPublicApiKey,
} from '@indiebase/server-shared';
import { Logger, Module, ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth';
import { MetaService } from './db/meta/meta.service';
import { InitializeDepsModule } from './deps.module';
import { ProbeModule } from './probe';
import { UsersModule } from './users/users.module';
import { MetaModule } from './db';
import { MgrModule } from './manager/mgr.module';
import { StorageModule } from './storage';
import { ConfigService } from '@nestjs/config';

/**
 * This module is the basic module of Lets, which contains the basic functions of community:
 *
 * @param {NonNullable<ModuleMetadata>} options
 */
export const createCommunityModule = function (
  options: NonNullable<ModuleMetadata> = {},
) {
  @Module({
    imports: [
      ProbeModule,
      MgrModule,
      AuthModule,
      UsersModule,
      MetaModule,
      StorageModule,
      ...options.imports,
      InitializeDepsModule,
    ],
    providers: [
      Logger,
      IsEntityExistedConstraint,
      MetaService,
      ...(options.providers ?? []),
    ],
  })
  class CommunityModule implements OnModuleInit {
    constructor(
      private readonly logger: Logger,
      private readonly config: ConfigService,
    ) {}
    async onModuleInit() {
      if (kDevMode) {
        const salt = this.config.get('security.publicApiGuardSalt');
        this.logger.debug('Public API Key: ' + genDevPublicApiKey(salt));
      }
    }
  }

  return CommunityModule as any;
};
