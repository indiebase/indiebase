import { BusinessTags, KnexEx, RedisUtils } from '@indiebase/server-shared';
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
import { FastifyRequest } from 'fastify';
import {
  type PrimitiveUser,
  type PrimitiveProject,
  ResultCode,
} from '@indiebase/trait';
import { InjectKnexEx } from '@indiebase/nest-knex';
import { did } from '@deskbtm/gadgets';
import { PasetoService } from 'nestjs-paseto';
import { InjectRedis } from '@indiebase/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
    private readonly pasetoService: PasetoService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  public async validateLocal(
    namespace: string,
    email: string,
    password: string,
  ) {
    const [err, user] = await did(
      this.knexEx.getUserByEmail(email, namespace, { exclude: false }),
    );

    if (err) {
      this.logger.error(err);
      throw new NotFoundException(`Not found ${email}`);
    }

    console.log(user);

    if (!user.password) {
      throw new UnauthorizedException('Please set password first');
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      throw new UnauthorizedException('Password incorrect');
    }

    delete user.password;

    return user;
  }

  public async handleGithubCallback(req: FastifyRequest, session: any) {
    const { user } = req;
    // const { _json: json, username, profileUrl, id, displayName } = profile;

    // const r = await this.userService.signIn({
    //   username: username,
    //   profileUrl: profileUrl,
    //   githubId: id,
    //   nickname: displayName,
    //   email: json?.email,
    //   avatar: json?.avatar_url,
    //   bio: json?.bio,
    //   githubAccessToken: accessToken,
    // });

    // session.set('user', {
    //   loggedIn: true,
    //   id: r.id,
    //   username,
    //   githubAccessToken: user.accessToken,
    // });

    // session.cookie.expires = new Date(
    //   Date.now() + 60 * 60 * 1000 * 24 * 30 * 99,
    // );

    // session.cookie.domain = getSubdomain(
    //   new URL(`${req.protocol}://${req.hostname}`).hostname,
    //   2,
    // );
  }

  public async signIn(user: PrimitiveUser, project: PrimitiveProject) {
    const { namespace, name } = project;
    const { email, id, role } = user;
    const token = await this.pasetoService.sign({
      id,
      email,
      role,
      project: name,
      namespace,
    });

    await this.redis.set(
      RedisUtils.formatNamespaceKey(BusinessTags.accessToken, namespace, id),
      token,
    );

    return token;
  }

  public async generateOtp(username: string) {
    const secret = authenticator.generateSecret(20);
    const uri = authenticator.keyuri(username, 'indiebase', secret);
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

  public async getOtpRecoveryCodes(username: string) {
    // const user = await this.userService.getUser({ username });
    // return user.optRecoveryCode;
  }

  public async removeOtp(username: string) {
    // return this.userService.repo
    //   .update(
    //     { username },
    //     { optRecoveryCode: null, optSecret: null, enabled2FA: false },
    //   )
    //   .catch((err) => {
    //     this.logger.error(err);
    //     throw new InternalServerErrorException();
    //   });
  }

  public async otpVerify(username: string, secret: string, token: string) {
    try {
      const isValid = authenticator.check(token, secret);
      let optRecoveryCode;

      if (isValid) {
        optRecoveryCode = this.createRecoveryCode();
        // await this.userService.updateUser(
        //   { username },
        //   { optSecret: secret, optRecoveryCode, enabled2FA: true },
        // );
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
