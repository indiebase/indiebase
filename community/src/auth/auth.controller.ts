import { ResultCode } from '@indiebase/sdk';
import {
  ApiPresetParam,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  Project,
  PublicApiGuard,
  QueryEx,
  User,
} from '@indiebase/server-shared';
import { PrimitiveUser } from '@indiebase/trait';
import { PrimitiveProject } from '@indiebase/trait/mgr';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';

import { AuthDTO, LocalSignInDTO, OptVerifyDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { GithubGuard, GoogleGuard } from './social';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in with password',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, LocalAuthGuard)
  @Post('signin')
  async signIn(
    @Body()
    _body: LocalSignInDTO,
    @User() user: PrimitiveUser,
    @Project() project: PrimitiveProject,
  ) {
    const accessToken = await this.authService.signIn(user, project);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Sign in successfully',
      accessToken,
    });
  }

  @Get('oauth/github')
  @ApiOperation({
    summary: 'Sign in with Github OAuth2',
  })
  @UseGuards(GithubGuard)
  async github(@QueryEx() _query: AuthDTO) {}

  @Get('oauth/github/callback')
  @ApiOperation({
    summary: 'OAuth2 Github callback',
  })
  @UseGuards(GithubGuard)
  async githubCallback(@Req() req: FastifyRequest) {
    const accessToken = await this.authService.handleGithubCallback(req);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Sign in successfully',
      accessToken,
    });
  }

  @Get('oauth/google')
  @ApiOperation({
    summary: 'Sign in with Google OAuth2',
    description: '',
  })
  @UseGuards(GoogleGuard)
  async google(@QueryEx() query: AuthDTO) {}

  @Get('google/callback')
  @ApiOperation({
    summary: 'OAuth2 Google callback',
  })
  @UseGuards(GoogleGuard)
  async googleCallback(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Get('oauth/microsoft')
  @ApiOperation({
    summary: 'Sign in with Microsoft OAuth2',
    description: '',
  })
  @UseGuards(GoogleGuard)
  async microsoft(@QueryEx() query: AuthDTO) {}

  @Get('microsoft/callback')
  @ApiOperation({
    summary: 'OAuth2 Microsoft callback',
  })
  @UseGuards(GoogleGuard)
  async microsoftCallback(@QueryEx() query: AuthDTO) {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Get('oauth/apple')
  @ApiOperation({
    summary: 'Sign in with Apple OAuth2',
    description: '',
  })
  @UseGuards(GoogleGuard)
  async apple(@QueryEx() query: AuthDTO) {}

  @Get('apple/callback')
  @ApiOperation({
    summary: 'OAuth2 Apple callback',
  })
  @UseGuards(GoogleGuard)
  async appleCallback() {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Get('oauth/wechat')
  @ApiOperation({
    summary: 'Sign in with WeChat OAuth2',
    description: '',
  })
  @UseGuards(GoogleGuard)
  async wechat(@QueryEx() query: AuthDTO) {}

  @Get('wechat/callback')
  @ApiOperation({
    summary: 'OAuth2 WeChat callback',
  })
  @UseGuards(GoogleGuard)
  async wechatCallback() {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Get('oauth/qq')
  @ApiOperation({
    summary: 'Sign in with QQ OAuth2',
    description: '',
  })
  @UseGuards(GoogleGuard)
  async qq(@QueryEx() query: AuthDTO) {}

  @Get('qq/callback')
  @ApiOperation({
    summary: 'OAuth2 QQ callback',
  })
  @UseGuards(GoogleGuard)
  async qqCallback() {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Get('oauth/facebook')
  @ApiOperation({
    summary: 'Sign in with Facebook OAuth2',
    description: '',
  })
  @UseGuards(GoogleGuard)
  async facebook(@QueryEx() query: AuthDTO) {}

  @Get('facebook/callback')
  @ApiOperation({
    summary: 'OAuth2 Facebook callback',
  })
  @UseGuards(GoogleGuard)
  async facebookCallback() {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Post('signout')
  @ApiOperation({
    summary: 'Sign out a user',
  })
  @UseGuards()
  async signout(@Req() req: FastifyRequest) {
    // await req
    //   .logOut()
    //   // Ensure delete session.
    //   .then(() => req.session.destroy())
    //   .catch(() => {
    //     throw new InternalServerErrorException();
    //   });
    return { code: ResultCode.SUCCESS };
  }

  @Post('otp')
  @ApiOperation({
    summary: 'Create one time password, QRCode',
  })
  @UseGuards(PublicApiGuard)
  async generateOtp(@User('username') username: string) {
    const d = await this.authService.generateOtp(username);

    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @Post('otp/verify')
  @UseGuards(PublicApiGuard)
  @ApiUnionType1Header()
  @ApiOperation({
    summary: 'Verify one time password, token',
  })
  async verifyOtp(@User('email') email: string, @Body() body: OptVerifyDTO) {
    // return this.authService.otpVerify(username, body.secret, body.token);
  }

  @Delete('otp')
  @UseGuards(PublicApiGuard)
  @ApiOperation({
    summary: 'Remove 2FA',
  })
  async deleteOtp(@User('email') email: string) {
    await this.authService.removeOtp(email);

    return { code: ResultCode.SUCCESS };
  }

  @Get('otp/recovery-codes')
  @ApiOperation({
    summary: 'Get recovery codes',
  })
  @UseGuards(PublicApiGuard)
  async getRecoveryCodes(@User('email') email: string) {
    const d = await this.authService.getOtpRecoveryCodes(email);

    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }
}
