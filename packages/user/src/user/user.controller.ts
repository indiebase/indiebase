import { LocalSignInDto, SignupDto } from '@letscollab/helper';
import { Controller } from '@nestjs/common';
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

  @MessagePattern({ cmd: 'get_full_user' })
  async getFullUser(@Payload() username: string) {
    return this.userService.getUser(username, true);
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(@Payload() username: string) {
    return this.userService.getUser(username);
  }
}
