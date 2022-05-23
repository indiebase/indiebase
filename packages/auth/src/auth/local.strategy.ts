import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalSignInDto } from '@letscollab/helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'account' });
  }

  async validate(account, password): Promise<any> {
    return this.authService.validateUser({ account, password });
  }
}
