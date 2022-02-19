/*
https://docs.nestjs.com/controllers#controllers
*/

import { AUTH_SERVICE_NAME, USER_SERVICE_NAME } from '@/app.constants';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class UserController {
  // constructor() {}
}
