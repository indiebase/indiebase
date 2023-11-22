import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PASETO_MODULE_OPTIONS } from './paseto.constants';
import {
  PasetoModuleAsyncOptions,
  PasetoModuleOptions,
} from './paseto.interface';
import { PasetoService } from './paseto.service';

@Module({})
export class PasetoModule {
  public static register(options: PasetoModuleOptions): DynamicModule {
    const provider = this.createProvider(options);

    return {
      module: PasetoModule,
      providers: [provider, PasetoService],
      exports: [PasetoService],
    };
  }

  public static registerAsync(
    options: PasetoModuleAsyncOptions,
  ): DynamicModule {
    const provider = this.createAsyncProvider(options);

    return {
      module: PasetoModule,
      imports: options.imports || [],
      providers: [provider, PasetoService],
      exports: [PasetoService],
    };
  }

  private static createAsyncProvider = function (
    options: PasetoModuleAsyncOptions,
  ): Provider {
    return {
      provide: PASETO_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };
  };

  private static createProvider = function (
    options: PasetoModuleOptions,
  ): Provider {
    return {
      provide: PASETO_MODULE_OPTIONS,
      useValue: options,
    };
  };
}
