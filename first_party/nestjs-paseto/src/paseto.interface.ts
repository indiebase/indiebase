import type {
  DynamicModule,
  ForwardReference,
  ModuleMetadata,
  Type,
} from '@nestjs/common';
import type {
  JsonWebKeyInput,
  KeyObject,
  PrivateKeyInput,
  PublicKeyInput,
} from 'crypto';
import type { ProduceOptions } from 'paseto';

export interface PasetoAsymmetricSignOptions {
  privateKey: KeyObject | Buffer | PrivateKeyInput | JsonWebKeyInput | string;
}

export interface PasetoAsymmetricVerifyOptions {
  publicKey: KeyObject | Buffer | PublicKeyInput | JsonWebKeyInput | string;
}

export interface PasetoSymmetricOptions {
  key: KeyObject | Buffer | string;
}

export interface ConsumeOptions {
  assertion?: string | Buffer;
  audience?: string;
  clockTolerance?: string;
  complete?: boolean;
  buffer?: boolean;
  ignoreExp?: boolean;
  ignoreIat?: boolean;
  ignoreNbf?: boolean;
  issuer?: string;
  maxTokenAge?: string;
  now?: Date;
  subject?: string;
}

export interface PasetoModuleOptions {
  version?: 'V1' | 'V2' | 'V3' | 'V4';
  localKey?: KeyObject | Buffer | string;
  privateKey?: KeyObject | Buffer | PrivateKeyInput | JsonWebKeyInput | string;
  publicKey?: KeyObject | Buffer | PublicKeyInput | JsonWebKeyInput | string;
  produceOptions?: Omit<ProduceOptions, 'assertion'>;
  consumeOptions?: Omit<ConsumeOptions, 'assertion'>;
}

export interface PasetoModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  useFactory?: (
    ...args: any[]
  ) => Promise<PasetoModuleOptions> | PasetoModuleOptions;
  inject?: any[];
}
