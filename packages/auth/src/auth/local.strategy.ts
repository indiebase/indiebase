import { Strategy } from 'passport-local';
import { PassportStrategy } from '@letscollab/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateLocal({ username, password });
    delete user.password;

    return user;
  }
}
