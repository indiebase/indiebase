import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { getSubdomain, ResultCode } from '@letscollab-nest/helper';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async validateLocal(username: string, password: string) {
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

  public async handleGithubCallback(req: FastifyRequest, session: any) {
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

  public async handleSingIn(req: FastifyRequest, session: any) {
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

  public async generateOtp(username: string) {
    const secret = authenticator.generateSecret(20);
    const uri = authenticator.keyuri(username, 'letscollab', secret);
    const qrcodeUri = await qrcode.toDataURL(uri);

    return {
      secret,
      uri,
      qrcodeUri,
    };
  }

  private createRecoveryCode(length = 8) {
    return Array.from({ length }).map(() => authenticator.generateSecret(16));
  }

  public async optVerify(username: string, secret: string, token: string) {
    try {
      const isValid = authenticator.check(token, secret);
      let optRecoveryCode;

      if (isValid) {
        optRecoveryCode = this.createRecoveryCode();
        await this.userService.updateUser(
          { username },
          { optSecret: secret, optRecoveryCode },
        );
      }
      return {
        code: isValid ? ResultCode.SUCCESS : ResultCode.ERROR,
        d: {
          optRecoveryCode,
        },
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
