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
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicApiHeader, PublicApiGuard } from '@indiebase/server-shared';
import { LocalSignInDto, OptVerifyDto } from './auth.dto';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { ResultCode } from '@indiebase/trait';
import { GithubGuard, GoogleGuard } from './social';
import { PasetoService } from 'nestjs-paseto';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth/v1')
export class AuthController {
  // constructor(private readonly authService: AuthService,) {}

  constructor(private readonly pasetoService: PasetoService) {}

  @Get('demo')
  async demo() {
    return this.pasetoService.sign({ demo: 11 });
  }
  // /**
  //  * Give up indiebase's register
  //  */
  // @Post('signin')
  // @PublicApiHeader()
  // @ApiOperation({
  //   summary: 'SignIn with password',
  // })
  // @UseGuards(PublicApiGuard, LocalAuthGuard)
  // async signIn(
  //   @Body() _: LocalSignInDto,
  //   @Req() req: FastifyRequest,
  //   @Session() session: any,
  // ) {
  //   await this.authService.handleSingIn(req, session);

  //   return {
  //     code: ResultCode.SUCCESS,
  //     message: 'Login Successfully',
  //   };
  // }

  // @Get('oauth/github')
  // @ApiOperation({
  //   summary: 'SignIn with github OAuth2',
  // })
  // @UseGuards(GithubGuard)
  // async github() {}

  // @Get('github/callback')
  // @ApiOperation({
  //   summary: 'OAuth2 github callback',
  // })
  // @UseGuards(GithubGuard)
  // async githubCallback(
  //   @Req() req: FastifyRequest,
  //   @Session() session: any,
  //   @Res() res: FastifyReply,
  // ) {
  //   await this.authService.handleGithubCallback(req, session);

  //   return res
  //     .type('text/html')
  //     .send(
  //       '<html><body><h3 style="text-align:center">Success</h3><script>setTimeout(()=>{window.close()}, 1000)</script></body>',
  //     );
  // }

  // @Get('oauth/google')
  // @ApiOperation({
  //   summary: 'SignIn with google OAuth2',
  //   description: 'Must use this for first time',
  // })
  // @UseGuards(GoogleGuard)
  // async google() {}

  // @Get('google/callback')
  // @ApiOperation({
  //   summary: 'OAuth2 google callback',
  // })
  // @UseGuards(GoogleGuard)
  // async googleCallback(
  //   @Req() req: FastifyRequest,
  //   @Session() session: any,
  //   @Res() res: FastifyReply,
  // ) {
  //   // await this.authService.handleGithubCallback(req, session);

  //   return res
  //     .type('text/html')
  //     .send(
  //       '<html><body><h3 style="text-align:center">Success</h3><script>setTimeout(()=>{window.close()}, 1000)</script></body>',
  //     );
  // }

  // @Post('logout')
  // @ApiOperation({
  //   summary: 'Logout',
  // })
  // @UseGuards()
  // async logout(@Req() req: FastifyRequest) {
  //   // await req
  //   //   .logOut()
  //   //   // Ensure delete session.
  //   //   .then(() => req.session.destroy())
  //   //   .catch(() => {
  //   //     throw new InternalServerErrorException();
  //   //   });
  //   return { code: ResultCode.SUCCESS };
  // }

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
