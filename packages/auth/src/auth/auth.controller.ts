import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.guard';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RolesGuard } from '@letscollab/nest-casbin';
import {
  ResultCode,
  ProtectGuard,
  ApiProtectHeader,
  IVerify,
} from '@letscollab/helper';
import { FastifyRequest } from 'fastify';
import { RpcAuthGuard } from './jwt-rpc.guard';
import { UserResDto } from '@letscollab/user';
import { LocalSignInDto } from './auth.dto';

@Controller('auth')
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
