import { BootStrategy, WebPassportStrategyAdapter } from '@midwayjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

@BootStrategy({
  async useParams({ configuration }): Promise<StrategyOptions> {
    return {
      secretOrKey: configuration.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  },
})
export class JwtStrategy extends WebPassportStrategyAdapter(Strategy, 'jwt') {
  async verify(payload) {
    return payload;
  }
}
