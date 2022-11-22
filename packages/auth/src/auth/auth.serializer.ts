// src/auth/serialization.provider.ts

import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@letscollab/passport';
import { AuthService } from './auth.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  serializeUser(
    user: any,
    done: (err: Error, user: { id: number; role: string }) => void,
  ) {
    console.log(user, '-----------');
    done(null, { id: user.id, role: user.role });
  }

  deserializeUser(
    payload: { id: number; role: string },
    done: (err: Error, user: Omit<any, 'password'>) => void,
  ) {
    console.log(payload);
    done(null, {});
  }
}
