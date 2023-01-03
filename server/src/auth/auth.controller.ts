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
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AccessGuard,
  ApiProtectHeader,
  MyInfo,
  ProtectGuard,
  ResultCode,
} from '@letscollab-nest/helper';
import { LocalSignInDto, OptVerifyDto } from './auth.dto';
import { GithubGuard } from './github.guard';
import { LocalAuthGuard } from './local.guard';
import { InjectS3, S3 } from '@letscollab-nest/aws-s3';
import { AuthService } from './auth.service';
import { authenticator } from 'otplib';

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
  @ApiOperation({
    summary: 'SignIn with password',
  })
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
  @ApiOperation({
    summary: 'SignIn with github OAuth2',
    description: 'Must use this for first time',
  })
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

  @Post('/2fa')
  @ApiOperation({
    summary: 'Create one time password, qrcode',
  })
  @UseGuards(ProtectGuard, AccessGuard)
  async generateOtp(@MyInfo('username') username: string) {
    const d = await this.authService.generateOtp(username);

    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @Post('/2fa/verify')
  @UseGuards(ProtectGuard, AccessGuard)
  @ApiOperation({
    summary: 'Verify one time password, token',
  })
  async verifyOtp(
    @MyInfo('username') username: string,
    @Body() body: OptVerifyDto,
  ) {
    return this.authService.optVerify(username, body.secret, body.token);
  }

  @Post('/2fa/disable')
  @UseGuards(ProtectGuard, AccessGuard)
  @ApiOperation({
    summary: '',
  })
  async disableOtp(
    @MyInfo('username') username: string,
    @Body() body: OptVerifyDto,
  ) {
    return this.authService.optVerify(username, body.secret, body.token);
  }

  @Delete('/2fa')
  @UseGuards(ProtectGuard, AccessGuard)
  @ApiOperation({
    summary: '',
  })
  async deleteOtp(
    @MyInfo('username') username: string,
    @Body() body: OptVerifyDto,
  ) {
    return this.authService.optVerify(username, body.secret, body.token);
  }

  @Post('demo')
  async demo() {
    console.log(authenticator.generateSecret(16));
    // console.log(this.s3);
  }
}
