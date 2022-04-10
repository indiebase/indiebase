import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CONSUL_KEY_VALUE } from './consul.constants';
import { KeyValueMetadata } from './utils';

@Injectable()
export class ConsulMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getKeyValues(target: Function): KeyValueMetadata[] | undefined {
    try {
      return this.reflector.get(CONSUL_KEY_VALUE, target);
    } catch (e) {
      return;
    }
  }
}
