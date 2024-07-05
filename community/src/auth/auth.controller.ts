import { PasetoAuthGuard } from './paseto.guard';
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
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';

import {
  AuthDTO,
  CreateOtpDTO,
  LocalSignInDTO,
  VerifyOtpDTO,
  OtpDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { GithubGuard, GoogleGuard } from './social';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth/v1')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

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
    const accessToken = await this.auth.signIn(user, project);

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
    const accessToken = await this.auth.handleGithubCallback(req);

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
    // await this.auth.handleGithubCallback(req, session);
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
    // await this.auth.handleGithubCallback(req, session);
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
    // await this.auth.handleGithubCallback(req, session);
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
    // await this.auth.handleGithubCallback(req, session);
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
    // await this.auth.handleGithubCallback(req, session);
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
    // await this.auth.handleGithubCallback(req, session);
  }

  @ApiOperation({
    summary: 'Sign out a user',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Post('signout')
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

  @ApiOperation({
    summary: 'Create one time password',
  })
  @ApiUnionResponse('created', OtpDTO)
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @ApiBearerAuth('paseto')
  @Post('otp')
  async createOtp(
    @Body() _body: CreateOtpDTO,
    @User('username') username: string,
    @Project('referenceId') referenceId: string,
  ) {
    const body = await this.auth.createOtp(username, referenceId);

    return data({
      code: ResultCode.SUCCESS,
      body,
    });
  }

  @ApiOperation({
    summary: 'Verify one time password, token',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Post('otp/enable/verify')
  async enableOtpVerify(
    @User() user: PrimitiveUser,
    @Body() { secret, token }: VerifyOtpDTO,
    @Project('namespace') namespace: string,
  ) {
    const isValid = await this.auth.enableOtpVerify(
      user,
      namespace,
      secret,
      token,
    );

    return data(
      Object.assign(
        {},
        { code: isValid ? ResultCode.SUCCESS : ResultCode.ERROR },
        !isValid && {
          message: `${token} is unavailable, and then try again please.`,
        },
      ),
    );
  }

  @ApiOperation({
    summary: 'Disable 2FA',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Patch('otp')
  async deleteOtp(@User('email') email: string) {
    await this.auth.removeOtp(email);

    return { code: ResultCode.SUCCESS };
  }

  @ApiOperation({
    summary: 'Get recovery codes',
  })
  @ApiUnionResponse('array', 'string')
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Get('otp/recovery-codes')
  async getRecoveryCodes(
    @User('id') id: number,
    @Project('namespace') namespace: string,
  ) {
    const body = await this.auth.getOtpRecoveryCodes(id, namespace);

    return {
      code: ResultCode.SUCCESS,
      body,
    };
  }
}
