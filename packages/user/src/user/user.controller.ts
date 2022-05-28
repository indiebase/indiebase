import {
  Body,
  Controller,
  Header,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CaptchaGuard, SignupDto, UserResDto } from '@letscollab/helper';

@Controller('user')
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @MessagePattern({ cmd: 'signup' })
  // async signup(@Payload() user: SignupDto) {
  //   return this.userService.signup(user);
  // }

  @MessagePattern({ cmd: 'get_full_user' })
  async getFullUser(@Payload() username: string) {
    return this.userService.getUser(username, true);
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(@Payload() username: string) {
    return this.userService.getUser(username);
  }

  @Post('query')
  @ApiBearerAuth('JWT-auth')
  async queryUsers(@Req() req: FastifyRequest) {
    this.userService.demo(req.headers.authorization);
    return 1;
  }

  @Post('signup')
  @ApiCreatedResponse({
    type: UserResDto,
  })
  @ApiHeader({
    name: 'Access-Control-Allow-Credential',
    description: 'Custom Protect API',
  })
  @UseGuards(CaptchaGuard)
  async signup(@Body() body: SignupDto, @Res() res: FastifyReply) {
    const r = await this.userService.signup(body);

    if (r.code > 0) {
      res.setCookie('__HOST-t', r.d.t, { httpOnly: true, secure: true });
    }

    res.send(r);
  }
}
