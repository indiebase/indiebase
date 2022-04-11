import { AUTH_RMQ } from '@/app.constants';
import { SignupDto } from '@letscollab/common';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { AvailableUserInfo } from './auth.interface';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(AUTH_RMQ)
    private client: ClientProxy,
    
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    await this.client.connect().catch((err) => {
      console.log(err);
    });
  }

  async validateUser(info: AvailableUserInfo): Promise<any> {}

  async signup(user: SignupDto): Promise<any> {
    this.logger.error('fucker');
  }

  async signTarget(object: string | Buffer | object) {
    return this.jwtService.sign(object);
  }

  isCaptchaExpire() {}
}
