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

  @MessagePattern({ cmd: 'full_user' })
  async getFull(@Payload() user: Pick<LocalSignInDto, 'account'>) {
    return this.userService.getFull(user.account);
  }
}
