import { randomUUID } from 'node:crypto';

import { Provider } from '@nestjs/common';
import Docker from 'dockerode';

import { DOCKER_CLIENT, DOCKER_MODULE_OPTIONS } from './docker.constants';
import {
  DockerModuleAsyncOptions,
  DockerModuleOptions,
} from './docker.interfaces';

export interface DockerClient {
  defaultKey: string;
  clients: Map<string, Docker>;
}

export function createDockerAsyncProvider(): Provider {
  return {
    provide: DOCKER_CLIENT,
    async useFactory(
      options: DockerModuleOptions | DockerModuleOptions[],
    ): Promise<DockerClient> {
      const clients = new Map<string, Docker>();
      let defaultKey = randomUUID();

      if (Array.isArray(options)) {
        await Promise.all(
          options.map(async (o) => {
            const key = o.name ?? defaultKey;
            if (clients.has(key)) {
              throw new Error(`Docker ${o.name ?? 'default'} client is exists`);
            }
            clients.set(key, new Docker(o));
          }),
        );
      } else {
        if (options.name) {
          defaultKey = options.name as any;
        }

        clients.set(defaultKey, new Docker(options));
      }

      return {
        defaultKey,
        clients,
      };
    },
    inject: [DOCKER_MODULE_OPTIONS],
  };
}

export function createDockerOptionsAsyncProvider(
  options: DockerModuleAsyncOptions,
): Provider {
  return {
    provide: DOCKER_MODULE_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject,
  };
}
