import { OctokitService } from './octokit.service';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { OctokitOptions, OctokitAsyncOptions } from './octokit.interface';
import { createOctokitProvider, createOctokitProviderAsync } from './provider';

@Module({})
@Global()
export class OctokitModule {
  public static forRoot(options?: OctokitOptions): DynamicModule {
    const provider = createOctokitProvider(options);
    return {
      module: OctokitModule,
      providers: [provider, OctokitService],
      exports: [OctokitService],
    };
  }

  public static forRootAsync(options?: OctokitAsyncOptions): DynamicModule {
    const provider = createOctokitProviderAsync(options);
    return {
      module: OctokitModule,
      providers: [provider, OctokitService],
      exports: [OctokitService],
      imports: options.imports ?? [],
    };
  }
}
