import { PASETO_MODULE_OPTIONS } from './paseto.constants';
import { PasetoModuleOptions } from './paseto.interface';
import { Inject, Injectable, Optional } from '@nestjs/common';
import assert from 'assert';
import * as paseto from 'paseto';
import { ConsumeOptions, ProduceOptions } from 'paseto';

@Injectable()
export class PasetoService {
  constructor(
    @Optional()
    @Inject(PASETO_MODULE_OPTIONS)
    private readonly options?: PasetoModuleOptions,
  ) {
    assert.ok(
      !options.version && !['V1', 'V2', 'V3', 'V4'].includes(options.version),
      `Paseto doesn't support ${options.version}`,
    );

    this.options = Object.assign({}, { version: 'V3' }, options);
  }

  public sign(
    payload: Record<PropertyKey, unknown> | Buffer,
    options?: ProduceOptions,
  ) {
    const version = this.options.version;
    return paseto[version].sign(payload, this.options.privateKey, options);
  }

  public verify<T extends boolean = any>(
    token: string,
    options?: ConsumeOptions<T>,
  ) {
    const version = this.options.version;
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

    return (paseto[version] as any).decrypt(
      token,
      this.options.localKey,
      options,
    );
  }
}
