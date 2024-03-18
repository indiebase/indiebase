import { X_Indiebase_AC } from '@indiebase/sdk';
import type {
  CanActivate,
  ExecutionContext,
  Logger} from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { FastifyRequest } from 'fastify';
import ms from 'ms';
import * as forge from 'node-forge';

/**
 *  Inspect token from header
 *
 *
 * @param token
 * @param secret
 * @param salt Recommend to use steganography to hide the salt in front-end
 * @example
 * ```
 *  X-Indiebase-AC: 1650884292;7RikC4;80d995638fcce7122ddf65bba87c9741
 * ```
 *
 */
const apiTokenInspect = function (
  token: string,
  salt: string,
  expire: string,
): boolean {
  const slugs = token.split(';');
  const [timestamp, _, hash] = slugs;

  const md = forge.md.md5.create();
  md.update(salt);

  return (
    md.digest().toHex() === hash &&
    Math.abs(Date.now() - ms(timestamp)) < ms(expire)
  );
};

/**
 *
 * Protect public api, avoid web crawler etc.
 * Default header: X-Indiebase-AC, custom in dotenv.
 */
@Injectable()
export class PublicApiGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const {
      publicApiGuardEnabled,
      publicApiGuardSalt,
      publicApiGuardExpiresIn,
    } = this.config.get('security');

    // If remote config is disabled, return true.
    if (!publicApiGuardEnabled) {
      return true;
    }

    const apiToken = request.headers[X_Indiebase_AC] as string;
    if (!apiToken) {
      throw new BadRequestException();
    }

    const r = apiTokenInspect(
      apiToken,
      publicApiGuardSalt,
      publicApiGuardExpiresIn,
    );

    if (!r) {
      throw new ForbiddenException();
    }

    return r;
  }
}
