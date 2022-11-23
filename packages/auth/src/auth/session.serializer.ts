// src/auth/serialization.provider.ts

import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@letscollab-nest/fastify-passport';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: any, req: any) {
    console.log(user, '=---------------------------------------');
    return {};
  }

  deserializeUser(payload: any, req: any) {
    console.log(payload);
    return {};
  }
}
