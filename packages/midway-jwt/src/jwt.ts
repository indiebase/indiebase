import { Config, Init, Provide } from '@midwayjs/decorator';
import * as jwt from 'jsonwebtoken';
import type {
  GetPublicKeyOrSecret,
  Secret,
  SignOptions,
  VerifyOptions,
  Jwt as JwtType,
  DecodeOptions,
} from 'jsonwebtoken';

type JwtPayload = string | Buffer | object;

/**
 *
 * @see{@link https://github.com/auth0/node-jsonwebtoken}
 */
@Provide()
export class Jwt {
  @Config('jwt')
  private _config: any;

  public signSync(payload: JwtPayload, options?: SignOptions, secret?: Secret): string | void {
    if (!secret) {
      secret = this._config?.secret;
    }

    if (!secret) {
      throw new Error('[midway-jwt]: provide the jwt secret please');
    }

    return jwt.sign(payload, secret, options);
  }

  /**
   *
   * @async
   */
  public async sign(payload: JwtPayload, options?: SignOptions, secret?: Secret): Promise<string | void> {
    if (!secret) {
      secret = this._config?.secret;
    }

    if (!secret) {
      throw new Error('[midway-jwt]: provide the jwt secret please');
    }

    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded);
        }
      });
    });
  }

  public verifySync(
    token: string,
    options?: VerifyOptions & { complete: true },
    secret?: Secret
  ): Jwt | string | JwtPayload {
    if (!secret) {
      secret = this._config?.secret;
    }

    if (!secret) {
      throw new Error('[midway-jwt]: provide the jwt secret please');
    }

    return jwt.verify(token, secret, options);
  }

  /**
   *
   * @async
   */
  public async verify(
    token: string,
    options?: VerifyOptions & { complete: true },
    secret?: Secret | GetPublicKeyOrSecret
  ): Promise<JwtType | undefined | JwtPayload> {
    if (!secret) {
      secret = this._config?.secret;
    }

    if (!secret) {
      throw new Error('[midway-jwt]: provide the jwt secret please');
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded);
        }
      });
    });
  }

  public decodeSync(
    token: string,
    options?: DecodeOptions & { complete: true } & { json: true }
  ): Jwt | null | JwtPayload | string {
    return jwt.decode(token, options);
  }
}
