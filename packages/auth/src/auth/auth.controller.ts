import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RolesGuard } from '@letscollab/nest-casbin';
import {
  ResultCode,
  ProtectGuard,
  ApiProtectHeader,
  IVerify,
} from '@letscollab/helper';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RpcAuthGuard } from './jwt-rpc.guard';
import { UserResDto } from '@letscollab/user';
import { LocalSignInDto } from './auth.dto';
import { AuthGuard } from '@letscollab/passport';
import { GithubGuard } from './github.guard';

@Controller('v1/auth')
@ApiTags('v1/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiCreatedResponse({
    type: UserResDto,
  })
  @ApiProtectHeader()
  @UseGuards(ProtectGuard, AuthGuard('local'))
  async signin(@Body() body: LocalSignInDto) {
    return this.authService.signin(body.username);
  }

  @Get('profile')
  @ApiBearerAuth('jwt')
  @UseGuards(ProtectGuard, JwtAuthGuard)
  async profile(@Request() req: FastifyRequest & { user: any }) {
    console.log(req.user);

    return 'demo';
  }

  @Get('github')
  @ApiBearerAuth('jwt')
  @UseGuards(GithubGuard)
  async github(@Request() req: FastifyRequest & { user: any }) {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubCallback(
    @Req() req: FastifyRequest & { user: any },
    @Res() res: FastifyReply,
  ) {
    const r = await this.authService.signupGithub(req.user);

    if (r.code > 0) {
      res.setCookie('__HOST-t', r.d.t, { httpOnly: true, secure: true });
    }

    res.send(r);
  }

  @UseGuards(RpcAuthGuard, RolesGuard)
  @MessagePattern({ cmd: 'verify' })
  async auth(@Payload() payload: IVerify) {
    return payload;
  }

  @MessagePattern({ cmd: 'sign' })
  async sign(@Payload() payload: any) {
    const t = await this.authService.signTarget(payload).catch((err) => {
      throw new RpcException({
        code: ResultCode.ERROR,
        message: err,
      });
    });

    return {
      code: ResultCode.SUCCESS,
      d: t,
    };
  }
}
