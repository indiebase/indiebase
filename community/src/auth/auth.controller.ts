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
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  PublicApiGuard,
  CommonApiHeader,
  EntityExistedPipe,
  XHeadersPipe,
} from '@indiebase/server-shared';
import { LocalSignInDto } from './auth.dto';
import { LocalAuthGuard } from './local.guard';
import { ResultCode } from '@indiebase/trait';
import { GithubGuard, GoogleGuard } from './social';
import { PasetoService } from 'nestjs-paseto';
import { X_Indiebase_Project_ID } from '@indiebase/sdk';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth/v1')
export class AuthController {
  constructor(private readonly pasetoService: PasetoService) {}

  @Post('signin')
  @CommonApiHeader()
  @ApiOperation({
    summary: 'Sign in with password',
  })
  @UseGuards(PublicApiGuard, LocalAuthGuard)
  async signIn(
    @Body()
    _: LocalSignInDto,
    @Req() req: FastifyRequest,
  ) {
    // await this.authService.handleSingIn(req, session);

    console.log(req.user);

    return {
      code: ResultCode.SUCCESS,
      message: 'Login Successfully',
    };
  }

  @Get('oauth/github')
  @ApiOperation({
    summary: 'SignIn with github OAuth2',
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
    summary: 'SignIn with google OAuth2',
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

  // @Post('2fa')
  // @ApiOperation({
  //   summary: 'Create one time password, qrcode',
  // })
  // @UseGuards(PublicApiGuard)
  // async generateOtp(@MyInfo('username') username: string) {
  //   const d = await this.authService.generateOtp(username);

  //   return {
  //     code: ResultCode.SUCCESS,
  //     d,
  //   };
  // }

  // @Post('2fa/verify')
  // @UseGuards(PublicApiGuard)
  // @ApiOperation({
  //   summary: 'Verify one time password, token',
  // })
  // async verifyOtp(
  //   @MyInfo('username') username: string,
  //   @Body() body: OptVerifyDto,
  // ) {
  //   return this.authService.otpVerify(username, body.secret, body.token);
  // }

  // @Delete('2fa')
  // @UseGuards(PublicApiGuard)
  // @ApiOperation({
  //   summary: 'Remove 2FA',
  // })
  // async deleteOtp(@MyInfo('username') username: string) {
  //   await this.authService.removeOtp(username);

  //   return { code: ResultCode.SUCCESS };
  // }

  // @Get('2fa/recovery-codes')
  // @ApiOperation({
  //   summary: 'Get recovery codes',
  // })
  // @UseGuards(PublicApiGuard)
  // async getRecoveryCodes(@MyInfo('username') username: string) {
  //   const d = await this.authService.getRecoveryCodes(username);
  //   return {
  //     code: ResultCode.SUCCESS,
  //     d,
  //   };
  // }
}
