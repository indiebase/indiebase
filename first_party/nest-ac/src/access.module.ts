import { DynamicModule, Global, Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessOptions, AccessAsyncOptions } from './access.interface';
import { ACCESS_CONTROL_OPTIONS } from './access.constants';

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
