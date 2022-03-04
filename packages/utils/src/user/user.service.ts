/*
https://docs.nestjs.com/providers#services
*/

import { AUTH_SERVICE_NAME } from '@/app.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}
}
