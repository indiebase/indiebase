import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
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
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly nacosConfigService: NacosConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      async secretOrKeyProvider(_request, _jwtToken, done) {
        const c = await nacosConfigService.getConfig('service-auth.json');

        done(null, c.jwt.secret);
      },
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    return payload;
  }
}
