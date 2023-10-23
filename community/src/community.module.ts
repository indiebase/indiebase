import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import {
  IsEntityExistedConstraint,
  KnexEx,
  genDevPublicApiKey,
} from '@indiebase/server-shared';
import {
  ExecutionContext,
  Logger,
  Module,
  ModuleMetadata,
  OnModuleInit,
} from '@nestjs/common';
import { Knex } from 'knex';
import { AuthModule } from '~/auth';
import { MetaService } from '~/db/meta/meta.service';
import { InitializeDepsModule } from '~/deps.module';
import { ProbeModule } from '~/probe';
import { UsersModule } from '~/users/users.module';
import { MetaModule } from '~/db';
import { MgrModule } from '~/manager/mgr.module';
import { StorageModule } from './storage';
import { ConfigService } from '@nestjs/config';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { RequestContextModule } from 'nestjs-request-context';

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
      private readonly metaService: MetaService,
      @InjectKnexEx()
      private readonly knexEx: KnexEx,
      @InjectKnex()
      private readonly knex: Knex,
      private readonly logger: Logger,
      private readonly config: ConfigService,
    ) {}
    async onModuleInit() {
      if (kDevMode) {
        const salt = this.config.get('security.publicApiGuardSalt');
        this.logger.debug('Public API Key: ' + genDevPublicApiKey(salt));
      }

      // this.ky.
      // console.log(this.ky.connection());
      // console.log(a);
      // let s = await this.knex('ib_orgs')
      //   .withSchema('mgr')
      //   .select(
      //     'ib_orgs.id',
      //     'ib_orgs.name',
      //     'ib_projects.name as project_name',
      //   )
      //   .from('ib_orgs')
      //   .join('ib_projects', function () {
      //     this.on('ib_orgs.id', '=', 'ib_projects.org_id');
      //   })
      //   .where('ib_orgs.id', 1);
    }
  }

  return CommunityModule as any;
};
