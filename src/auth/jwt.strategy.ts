import { BootStrategy, ExpressPassportStrategyAdapter } from '@deskbtm/midway-passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

@BootStrategy({
  async useParams({ configuration }): Promise<StrategyOptions> {
    console.log(configuration.jwt.secret);
    return {
      secretOrKey: configuration.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  },
})
export class JwtStrategy extends ExpressPassportStrategyAdapter(Strategy, 'jwt') {
  async verify(payload) {
    return payload;
  }
}
