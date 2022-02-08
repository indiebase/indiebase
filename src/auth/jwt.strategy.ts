import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JAccountAuth, requestJAccount } from '@/common';
import { stringify } from 'querystring';

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
  private grant_type = 'refresh_token';

  constructor(
    private readonly configSrv: ConfigService, // private readonly redisSrv: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configSrv.get('jwt.secret'),
    });
  }

  private async refreshJAccountToken(body: any): Promise<JAccountAuth> {
    const res = await requestJAccount
      .post('oauth2/token', {
        body: stringify(body),
      })
      .catch((err) => {
        console.error(err);
      });

    return res ? (res.body as any) : null;
  }

  async validate(payload: JwtPayload) {
    console.log(payload);

    // 带有r_t 刷新 JAccount token
    if (payload.r_t) {
      await this.refreshJAccountToken({
        grant_type: this.grant_type,
        client_id: this.configSrv.get('common.clientId'),
        client_secret: this.configSrv.get('common.clientSecret'),
        refresh_token: payload.r_t,
      }).catch(() => {});
    }

    console.debug(payload, '==============================');
    return payload;
  }
}
