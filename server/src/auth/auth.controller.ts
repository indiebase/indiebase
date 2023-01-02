import { CoProtectGuard } from '../utils';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  Controller,
  UseGuards,
  Get,
  Req,
  Res,
  Session,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AccessGuard,
  ApiProtectHeader,
  getSubdomain,
  ProtectGuard,
  ResultCode,
} from '@letscollab-nest/helper';
import { LocalSignInDto } from './auth.dto';
import { GithubGuard } from './github.guard';
import { LocalAuthGuard } from './local.guard';
import { InjectS3, S3 } from '@letscollab-nest/aws-s3';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectS3()
    private readonly s3: S3,
  ) {}
  //TODO: recaptcha

  /**
   * Give up letscollab's register
   */
  @Post('signin')
  @ApiProtectHeader()
  @UseGuards(CoProtectGuard, LocalAuthGuard)
  async signIn(
    @Body() _: LocalSignInDto,
    @Req() req: FastifyRequest,
    @Session() session: any,
  ) {
    await this.authService.handleSingIn(req, session);

    return {
      code: ResultCode.SUCCESS,
      message: 'Login Successfully',
    };
  }

  @Get('oauth/github')
  @UseGuards(GithubGuard)
  async github() {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubCallback(
    @Req() req: FastifyRequest,
    @Session() session: any,
    @Res() res: FastifyReply,
  ) {
    await this.authService.handleGithubCallback(req, session);

    return res
      .type('text/html')
      .send(
        '<html><body><h3 style="text-align:center">Success</h3><script>setTimeout(()=>{window.close()}, 1000)</script></body>',
      );
  }

  @Post('logout')
  @UseGuards(AccessGuard)
  async logout(@Req() req: FastifyRequest) {
    await req
      .logOut()
      // Ensure delete session.
      .then(() => req.session.destroy())
      .catch(() => {
        throw new InternalServerErrorException();
      });
    return { code: ResultCode.SUCCESS };
  }

  @Post('/2fa/gen')
  @UseGuards(ProtectGuard, AccessGuard)
  async generateOtp() {
    this;

    return {
      code: ResultCode.SUCCESS,
      d: {},
    };
  }

  @Post('demo')
  async demo() {
    console.log(this.s3);
  }
}
