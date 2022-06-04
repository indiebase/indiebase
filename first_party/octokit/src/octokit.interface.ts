import { ModuleMetadata } from '@nestjs/common';
import { Octokit } from 'octokit';

export interface OctokitOptions {
  options?: ConstructorParameters<typeof Octokit>[0];
  plugins?: Parameters<typeof Octokit['plugin']>;
}

export interface OctokitAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<OctokitOptions> | OctokitOptions;
  inject?: any[];
}
