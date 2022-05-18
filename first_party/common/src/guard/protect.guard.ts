import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { NacosConfigService } from '@letscollab/nest-nacos';
import * as forge from 'node-forge';
/**
 *  校验Header中的API
 *
 * @param token
 * @param secret
 * @param salt
 * @example
 * ```
 *  Access-Control-Allow-Credential 不同于 Access-Control-Allow-Credentials
 *  Access-Control-Allow-Credential: 1650884292;7RikC4;80d995638fcce7122ddf65bba87c9741
 * ```
 *
 */
export const apiTokenInspect = async function (
  token: string,
  salt: string,
  expire: number = 0,
): Promise<boolean> {
  const slugs = token.split(';');
  const [timestamp, _, hash] = slugs;

  const md = forge.md.md5.create();
  md.update(salt);

  return (
    md.digest().toHex() === hash && Date.now() + expire < parseInt(timestamp)
  );
};

@Injectable()
export class ProtectGuard implements CanActivate {
  constructor(private readonly nacosConfigService: NacosConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    try {
      const apiToken = request.headers[
        'Access-Control-Allow-Credential'
      ] as string;
      const common = await this.nacosConfigService.getConfig('common.json');
      const salt = common.security.apiSalt;
      const expire = common.security.expire;
      return apiTokenInspect(apiToken, salt, expire);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
