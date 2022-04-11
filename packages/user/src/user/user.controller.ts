import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {} // private readonly client: ClientProxy, // @Inject(AUTH_SERVICE_NAME)

  @MessagePattern({ cmd: 'signup' })
  async signup(@Payload() body) {
    console.log(body, '============');
    return 'demdoedmeomdoe';
    // return this.userService.register(body);
  }

  @Post('register-admin')
  async registerAdmin(@Body() body) {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return 'demo';
  }
}
