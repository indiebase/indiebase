import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  Res,
  Get,
} from '@nestjs/common';
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
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
@ApiTags('v1/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiCreatedResponse({
    type: UserResDto,
  })
  @UseGuards(AuthGuard('local'))
  async signin(@Body() body: LocalSignInDto) {
    return this.authService.signin(body.username);
  }

  @Post('logout')
  async logout(@Request() req: Request) {
    return 'demo';
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
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
