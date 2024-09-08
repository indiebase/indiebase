import { Inject, Injectable } from '@nestjs/common';
import Docker from 'dockerode';

import { DOCKER_CLIENT } from './docker.constants';
import { type DockerClient } from './docker.providers';

@Injectable()
export class DockerService {
  constructor(
    @Inject(DOCKER_CLIENT)
    private client: DockerClient,
  ) {}

  getClient(name?: string): Docker | undefined {
    if (!name) {
      name = this.client.defaultKey;
    }
    if (!this.client.clients.has(name)) {
      throw new Error(`client ${name} does not exist`);
    }
    return this.client.clients.get(name);
  }

  getClients(): Map<string, Docker> {
    return this.client.clients;
  }
}
