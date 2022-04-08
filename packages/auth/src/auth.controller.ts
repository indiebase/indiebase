import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Provide,
} from '@midwayjs/decorator';
import { AuthRabbitMQService } from './auth.provider';

@Provide()
@Controller('/auth')
export class AuthController {
  @Inject()
  rabbitMQProvider: AuthRabbitMQService;

  @Get('/login')
  async login() {
    return 'demo';
  }

  @Get('/profile')
  async profile() {
    return 'demo';
  }
}
