import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';
import { ApiBearerAuth, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { SignupDto } from '@letscollab/common';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('v1/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Request) {
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
  // @UseGuards(CaptchaGuard)
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @ApiOAuth2(['pets:write'])
  @Post('github')
  async github(@Request() req: Request) {
    return 'demo';
  }
}
