import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOAuth2,
  ApiTags,
} from '@nestjs/swagger';
import { LocalSignInDto, SignupDto, UserResDto } from '@letscollab/helper';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('v1/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signin(@Request() req: any) {
    console.log(req.user);
    // console.log(body);
    // await lastValueFrom(
    //   this.client.send({ cmd: 'signup' }, 'demo').pipe(timeout(5000)),
    // );
    return 'demo';
  }

  @Post('logout')
  async logout(@Request() req: Request) {
    return 'demo';
  }

  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  @Post('profile')
  async profile(@Request() req: Request) {
    return 'demo';
  }

  @Post('signup')
  @ApiCreatedResponse({
    type: UserResDto,
  })
  // @UseGuards(CaptchaGuard)
  async signup(@Body() body: SignupDto, @Res() res: FastifyReply) {
    const r = await this.authService.signup(body);

    if (r.code > 0) {
      res.setCookie('__HOST-t', r.d.t, { httpOnly: true, secure: true });
    }

    res.send(r);
  }

  @ApiOAuth2(['pets:write'])
  @Post('github')
  async github(@Request() req: Request) {
    return 'demo';
  }
}
