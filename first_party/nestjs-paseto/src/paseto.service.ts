import { Inject, Injectable, Optional } from '@nestjs/common';
import assert from 'assert';
import { ConsumeOptions, ConsumeOptionsBuffer, ProduceOptions } from 'paseto';
import * as paseto from 'paseto';

import { PASETO_MODULE_OPTIONS } from './paseto.constants';
import { PasetoModuleOptions } from './paseto.interface';

@Injectable()
export class PasetoService {
  constructor(
    @Optional()
    @Inject(PASETO_MODULE_OPTIONS)
    private readonly options?: PasetoModuleOptions,
  ) {
    this.options = Object.assign({}, { version: 'V3' }, options);
    const ver = this.options.version;
    assert.ok(
      ['V1', 'V2', 'V3', 'V4'].includes(ver),
      `Paseto doesn't support ${ver}`,
    );
  }

  public sign(
    payload: Record<PropertyKey, unknown> | Buffer,
    options?: ProduceOptions,
  ) {
    const version = this.options.version;
    options = Object.assign(this.options.produceOptions, options);

    return paseto[version].sign(payload, this.options.privateKey, options);
  }

  public verify<T extends boolean = any>(
    token: string,
    options?: ConsumeOptions<T> | ConsumeOptionsBuffer<T>,
  ) {
    const version = this.options.version;
    options = Object.assign({}, this.options.consumeOptions, options);

    return paseto[version].verify(
      token,
      this.options.publicKey,
      options as any,
    );
  }

  public encrypt(
    payload: Record<PropertyKey, unknown> | Buffer,
    options?: ProduceOptions,
  ) {
    const version = this.options.version;

    if (['V2', 'V4'].includes(version)) {
      throw new Error(`Paseto ${version} doesn't support encrypt`);
    }

    options = Object.assign({}, this.options.produceOptions, options);

    return (paseto[version] as any).encrypt(
      payload,
      this.options.localKey,
      options,
    );
  }

  public decrypt<T extends boolean = any>(
    token: string,
    options?: ConsumeOptions<T>,
  ) {
    const version = this.options.version;

    if (['V2', 'V4'].includes(version)) {
      throw new Error(`Paseto ${version} doesn't support decrypt`);
    }

    options = Object.assign({}, this.options.consumeOptions, options);

    return (paseto[version] as any).decrypt(
      token,
      this.options.localKey,
      options,
    );
  }
}
