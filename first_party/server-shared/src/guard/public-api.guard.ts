import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
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
 *  X-Lets-Api-Credential: 1650884292;7RikC4;80d995638fcce7122ddf65bba87c9741
 * ```
 *
 */
const apiTokenInspect = function (
  token: string,
  salt: string,
  expire: number = 0,
): boolean {
  const slugs = token.split(';');
  const [timestamp, _, hash] = slugs;

  const md = forge.md.md5.create();
  md.update(salt);

  return (
    md.digest().toHex() === hash && Date.now() + expire < parseInt(timestamp)
  );
};

/**
 *
 * Protect public Api, avoid web crawler etc.
 * Default header: X-Lets-Api-Credential , custom in dotenv.
 */
@Injectable()
export class PublicApiGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    try {
      const {
        publicApiGuardEnabled,
        publicApiGuardSalt,
        publicApiGuardExpiresIn,
      } = this.config.get('security');

      // If remote config is disabled, return true.
      if (!publicApiGuardEnabled) {
        return true;
      }

      const apiToken = request.headers['X-Lets-Api-Credential'] as string;

      if (!apiToken) {
        throw new BadRequestException();
      }

      return apiTokenInspect(
        apiToken,
        publicApiGuardSalt,
        publicApiGuardExpiresIn,
      );
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
