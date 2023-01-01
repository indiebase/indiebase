import { CoProtectGuard } from '../utils';
import { UserService } from '../user/user.service';
import { NacosConfigService } from '@letscollab-nest/nacos';
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
  ApiProtectHeader,
  getSubdomain,
  ResultCode,
} from '@letscollab-nest/helper';
import { LocalSignInDto } from './auth.dto';
import { GithubGuard } from './github.guard';
import { LocalAuthGuard } from './local.guard';
import { InjectS3, S3 } from '@letscollab-nest/aws-s3';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly nacos: NacosConfigService,
    private readonly userService: UserService,
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
    const user = req.user;

    session.set('user', {
      loggedIn: true,
      id: user.id,
      username: user.username,
      accessToken: user.githubAccessToken,
    });

    session.cookie.expires = new Date(
      Date.now() + 60 * 60 * 1000 * 24 * 30 * 99,
    );

    session.cookie.domain = getSubdomain(
      new URL(`${req.protocol}://${req.hostname}`).hostname,
      2,
    );

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
    const { profile, accessToken } = req.user;
    const { _json: json, username, profileUrl, id, displayName } = profile;

    const r = await this.userService.signIn({
      username: username,
      profileUrl: profileUrl,
      githubId: id,
      nickname: displayName,
      email: json?.email,
      avatar: json?.avatar_url,
      bio: json?.bio,
      githubAccessToken: accessToken,
    });

    session.set('user', {
      loggedIn: true,
      id: r.id,
      username,
      githubAccessToken: req.user.accessToken,
    });

    session.cookie.expires = new Date(
      Date.now() + 60 * 60 * 1000 * 24 * 30 * 99,
    );

    session.cookie.domain = getSubdomain(
      new URL(`${req.protocol}://${req.hostname}`).hostname,
      2,
    );

    return res
      .type('text/html')
      .send(
        '<html><body><h3 style="text-align:center">Success</h3><script>setTimeout(()=>{window.close()}, 1000)</script></body>',
      );
  }

  @Post('logout')
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

  @Post('demo')
  async demo() {
    console.log(this.s3);
  }
}
