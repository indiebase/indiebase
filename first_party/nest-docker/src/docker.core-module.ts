import { DynamicModule, Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import { DockerModuleAsyncOptions } from './docker.interfaces';
import {
  createDockerAsyncProvider,
  createDockerOptionsAsyncProvider,
} from './docker.providers';

@Global()
@Module({})
export class DockerCoreModule {
  public static forRootAsync(options: DockerModuleAsyncOptions): DynamicModule {
    const dockerProvider: Provider = createDockerAsyncProvider();
    const dockerOptionsProvider = createDockerOptionsAsyncProvider(options);

    return {
      module: DockerCoreModule,
      imports: options.imports,
      providers: [dockerProvider, dockerOptionsProvider],
      exports: [dockerProvider],
    };
  }
}
