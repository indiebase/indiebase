import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';

import { FastifyReply, FastifyRequest } from 'fastify';
import { Http2RmqAuthGuard } from 'src/guard/rmq-auth.guard';
import { UserResDto, SignupDto } from './user.dto';

@Controller('user')
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_complete_name' })
  async getFullUser(@Payload() username: string) {
    return this.userService.getUser({ username }, true);
  }

  @MessagePattern({ cmd: 'get_name' })
  async getName(@Payload() username: string) {
    return this.userService.getUser({ username });
  }

  @MessagePattern({ cmd: 'get_id' })
  async getId(@Payload() id: number) {
    return this.userService.getUser({ id });
  }

  @Post('query')
  @ApiBearerAuth('jwt')
  @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Req() req: FastifyRequest) {
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
  // @UseGuards(CaptchaGuard)
  async signup(@Body() body: SignupDto, @Res() res: FastifyReply) {
    const r = await this.userService.signup(body);

    if (r.code > 0) {
      res.setCookie('__HOST-t', r.d.t, { httpOnly: true, secure: true });
    }

    res.send(r);
  }
}
