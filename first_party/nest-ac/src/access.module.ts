import type { DynamicModule} from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import { ACCESS_CONTROL_OPTIONS } from './access.constants';
import type { AccessAsyncOptions,AccessOptions } from './access.interface';
import { AccessService } from './access.service';

@Module({})
@Global()
export class AccessControlModule {
  public static forRoot(options?: AccessOptions): DynamicModule {
    return {
      module: AccessControlModule,
      providers: [
        {
          provide: ACCESS_CONTROL_OPTIONS,
          useValue: options,
        },
        AccessService,
      ],
      exports: [AccessService],
      imports: options.imports ?? [],
    };
  }

  public static forRootAsync(options?: AccessAsyncOptions): DynamicModule {
    return {
      module: AccessControlModule,
      providers: [
        {
          provide: ACCESS_CONTROL_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        AccessService,
      ],
      exports: [AccessService],
      imports: options.imports ?? [],
    };
  }
}
