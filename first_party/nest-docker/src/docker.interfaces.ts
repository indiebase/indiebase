import { ModuleMetadata } from '@nestjs/common';
import { DockerOptions } from 'dockerode';

export interface DockerModuleOptions extends DockerOptions {
  name?: string;
}

export interface DockerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory: (
    ...args: any[]
  ) =>
    | Promise<DockerModuleOptions>
    | Promise<DockerModuleOptions[]>
    | DockerModuleOptions
    | DockerModuleOptions[];
}
