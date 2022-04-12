import { SignupDto } from '@letscollab/common';
import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'signup' })
  async signup(@Payload() user: SignupDto) {
    return this.userService.signup(user);
  }

  @Post('register-admin')
  async registerAdmin(@Body() body) {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return 'demo';
  }
}
