import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { FastifyReply, FastifyRequest } from 'fastify';
import { Http2RmqAuthGuard } from 'src/guard/rmq-auth.guard';
import { UserResDto, SignupDto } from './user.dto';
import { ApiProtectHeader, CaptchaGuard } from '@letscollab/helper';
import { SignupType } from './user.enum';

@Controller('v1/user')
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

  @MessagePattern({ cmd: 'signup_github' })
  async signupGithub(@Payload() profile) {
    const { _json: json, username, profileUrl } = profile;

    return this.userService.signup({
      username: username,
      profileUrl: profileUrl,
      signupType: SignupType.github,
      githubId: profile.id,
      nickname: profile.displayName,
      email: profile.emails?.[0].value,
      avatar: json?.avatar_url,
      bio: json?.bio,
    });
  }

  @Get(':username')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async queryUser(@Req() req: FastifyRequest) {
    return 1;
  }

  @Get('users')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Req() req: FastifyRequest) {
    return 1;
  }

  @Post('update')
  @ApiBearerAuth('jwt')
  @UseGuards(Http2RmqAuthGuard)
  async updatePassword() {
    return 1;
  }

  @Post('signup')
  @ApiCreatedResponse({
    type: UserResDto,
  })
  @ApiProtectHeader()
  @UseGuards(CaptchaGuard)
  async signup(@Body() body: SignupDto, @Res() res: FastifyReply) {
    const r = await this.userService.signup({
      signupType: SignupType.letscollab,
      username: body.username,
      password: body.password,
      email: body.email,
      nickname: body.nickname,
    });

    if (r.code > 0) {
      res.setCookie('__HOST-t', r.d.t, { httpOnly: true, secure: true });
    }

    res.send(r);
  }
}
