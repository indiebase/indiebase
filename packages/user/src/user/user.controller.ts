import { AUTH_SERVICE_NAME } from '@/app.constants';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserRegisterDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // private readonly client: ClientProxy, // @Inject(AUTH_SERVICE_NAME)

  @Post('register')
  async register(@Body() body: UserRegisterDto) {
    // console.log(body);
    return this.userService.register(body);
  }

  @Post('register-admin')
  async registerAdmin(@Body() body) {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return 'demo';
  }
}
