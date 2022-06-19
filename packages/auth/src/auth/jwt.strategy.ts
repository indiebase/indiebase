import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPassportStrategy, PassportStrategy } from '@letscollab/passport';
import { Injectable } from '@nestjs/common';
import { NacosConfigService } from '@letscollab/nest-nacos';

export interface JwtPayload {
  roles: string[];

  account: string;
  /**
   * jac token
   */
  a_t: string;

  r_t: string;
}

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements IPassportStrategy
{
  constructor(readonly nacosConfigService: NacosConfigService) {
    super();
  }

  async setOptions() {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      async secretOrKeyProvider(_request, _jwtToken, done) {
        const c = await this.nacosConfigService.getConfig('service-auth.json');

        done(null, c.jwt.secret);
      },
    };
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
