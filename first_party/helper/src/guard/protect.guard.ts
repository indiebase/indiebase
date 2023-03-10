import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { NacosConfigService } from '@letscollab-nest/nacos';
import * as forge from 'node-forge';
import { ApiHeader } from '@nestjs/swagger';
/**
 *  Inspect token from header
 *
 *
 * @param token
 * @param secret
 * @param salt Recommend to use steganography to hide the salt in front-end
 * @example
 * ```
 *  X-Letscollab-Api-Credential is different from X-Letscollab-Api-Credentials
 *  X-Letscollab-Api-Credential: 1650884292;7RikC4;80d995638fcce7122ddf65bba87c9741
 * ```
 *
 *
 */
export const apiTokenInspect = function (
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
 * Api Protect, avoid  
 * Default header: X-Letscollab-Api-Credential , custom in nacos config.
 *
 */

export function ProtectGuard(configName: string) {
  @Injectable()
  class ProtectInnerGuard implements CanActivate {
    constructor(
      private readonly nacosConfigService: NacosConfigService,
      private readonly logger: Logger,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      try {
        const config =
          (await this.nacosConfigService.getConfig(configName)) ?? {};

        // If remote config is disabled, return true.
        if (!config.apiProtect.enableProtectGuard) {
          return true;
        }

        const apiToken = request.headers[
          config.apiProtect?.guardHeader ?? 'X-Letscollab-Api-Credential'
        ] as string;

        if (!apiToken) {
          throw new BadRequestException();
        }
        const salt = config.apiProtect.apiSalt;
        const expire = config.apiProtect.apiExpire;
        return apiTokenInspect(apiToken, salt, expire);
      } catch (error) {
        this.logger.error(error);
        throw new BadRequestException();
      }
    }
  }

  return ProtectInnerGuard as any;
}

export const ApiProtectHeader = () =>
  ApiHeader({
    name: 'X-Letscollab-Api-Credential',
    description: 'Custom Protect API',
  });
