import { ResultCode } from '@indiebase/sdk';
import {
  ApiUnionResponse,
  ApiUnionType1Header,
  Project,
  PublicApiGuard,
  User,
} from '@indiebase/server-shared';
import { PrimitiveUser } from '@indiebase/trait';
import { PrimitiveProject } from '@indiebase/trait/mgr';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';

import { LocalSignInDTO, OptVerifyDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { GithubGuard, GoogleGuard } from './social';

@Controller({ path: 'oauth', version: '1' })
@ApiTags('OAuth/v1')
export class AuthController {
  private readonly logger = new Logger('AuthController');

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
    _: LocalSignInDTO,
    @User() user: PrimitiveUser,
    @Project() project: PrimitiveProject,
  ) {
    const accessToken = await this.authService.signIn(user, project);

    return {
      code: ResultCode.SUCCESS,
      message: 'Login Successfully',
      accessToken,
    };
  }

  @Get('oauth/github')
  @ApiOperation({
    summary: 'Sign in with github OAuth2',
  })
  @UseGuards(GithubGuard)
  async github() {}

  @Get('github/callback')
  @ApiOperation({
    summary: 'OAuth2 github callback',
  })
  @UseGuards(GithubGuard)
  async githubCallback(
    @Req() req: FastifyRequest,
    @Session() session: any,
    @Res() res: FastifyReply,
  ) {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Get('oauth/google')
  @ApiOperation({
    summary: 'Sign in with google OAuth2',
    description: 'Must use this for first time',
  })
  @UseGuards(GoogleGuard)
  async google() {}

  @Get('google/callback')
  @ApiOperation({
    summary: 'OAuth2 google callback',
  })
  @UseGuards(GoogleGuard)
  async googleCallback(
    @Req() req: FastifyRequest,
    @Session() session: any,
    @Res() res: FastifyReply,
  ) {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Get('oauth/microsoft')
  @ApiOperation({
    summary: 'Sign in with microsoft OAuth2',
    description: 'Must use this for first time',
  })
  @UseGuards(GoogleGuard)
  async microsoft() {}

  @Get('microsoft/callback')
  @ApiOperation({
    summary: 'OAuth2 microsoft callback',
  })
  @UseGuards(GoogleGuard)
  async microsoftCallback(
    @Req() req: FastifyRequest,
    @Session() session: any,
    @Res() res: FastifyReply,
  ) {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Get('oauth/apple')
  @ApiOperation({
    summary: 'Sign in with apple OAuth2',
    description: 'Must use this for first time',
  })
  @UseGuards(GoogleGuard)
  async apple() {}

  @Get('apple/callback')
  @ApiOperation({
    summary: 'OAuth2 apple callback',
  })
  @UseGuards(GoogleGuard)
  async appleCallback(
    @Req() req: FastifyRequest,
    @Session() session: any,
    @Res() res: FastifyReply,
  ) {
    // await this.authService.handleGithubCallback(req, session);
  }

  @Post('signout')
  @ApiOperation({
    summary: 'Logout',
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
