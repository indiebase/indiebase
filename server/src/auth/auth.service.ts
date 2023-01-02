import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { getSubdomain } from '@letscollab-nest/helper';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateLocal(username: string, password: string) {
    let user = await this.userService.getUser(
      { username },
      {
        full: true,
      },
    );

    if (!!user) {
      if (!user.password) {
        throw new UnauthorizedException('Please set your password first');
      }

      if (await bcrypt.compare(password, user.password)) {
        return user;
      } else {
        throw new UnauthorizedException('Wrong password');
      }
    } else {
      throw new NotFoundException(
        `User ${username} not existed,  register first plz`,
      );
    }
  }

  async handleGithubCallback(req: FastifyRequest, session: any) {
    const { user } = req;
    const { profile, accessToken } = user;
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
      githubAccessToken: user.accessToken,
    });

    session.cookie.expires = new Date(
      Date.now() + 60 * 60 * 1000 * 24 * 30 * 99,
    );

    session.cookie.domain = getSubdomain(
      new URL(`${req.protocol}://${req.hostname}`).hostname,
      2,
    );
  }

  async handleSingIn(req: FastifyRequest, session: any) {
    const { user } = req;
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
  }

  async generateOtp(username: string) {
    const secret = authenticator.generateSecret(20);
    const uri = authenticator.keyuri(username, 'letscollab', secret);
    const qrcodeUri = await qrcode.toDataURL(uri);

    return {
      uri,
      qrcodeUri,
    };
  }

  async optVerify() {}
}
