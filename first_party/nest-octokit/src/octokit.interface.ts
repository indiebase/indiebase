import type { ModuleMetadata } from '@nestjs/common';
import type { Octokit } from 'octokit';

export interface OctokitOptions {
  optionsFactory: (req: any) => ConstructorParameters<typeof Octokit>[0];
  plugins?: Parameters<typeof Octokit['plugin']>;
}

export interface OctokitAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<OctokitOptions> | OctokitOptions;
  inject?: any[];
}
