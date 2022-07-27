import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { NacosConfigService } from '@letscollab/nest-nacos';
import * as forge from 'node-forge';
import { ApiHeader } from '@nestjs/swagger';
/**
 *  Inspect token from header
 *
 *
 * @param token
 * @param secret
 * @param salt Recommend to use steganography to hide the salt in frontend
 * @example
 * ```
 *  Access-Control-Allow-Credential different from Access-Control-Allow-Credentials
 *  Access-Control-Allow-Credential: 1650884292;7RikC4;80d995638fcce7122ddf65bba87c9741
 * ```
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
 * Default header: Access-Control-Allow-Credential , custom in nacos config.
 */
@Injectable()
export class ProtectGuard implements CanActivate {
  constructor(
    private readonly nacosConfigService: NacosConfigService,
    private readonly logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    try {
      const common = await this.nacosConfigService.getConfig('common.json');

      // If remote config not enable, return true.
      if (!common.security.enableProtectGuard) {
        return true;
      }

      const apiToken = request.headers[
        common?.security?.guardHeader ?? 'Access-Control-Allow-Credential'
      ] as string;

      if (!apiToken) {
        throw new BadRequestException();
      }
      const salt = common.security.apiSalt;
      const expire = common.security.expire;
      return apiTokenInspect(apiToken, salt, expire);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}

export const ApiProtectHeader = () =>
  ApiHeader({
    name: 'Access-Control-Allow-Credential',
    description: 'Custom Protect API',
  });
