import { did } from '@deskbtm/gadgets';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { InjectRedis } from '@indiebase/nestjs-redis';
import { AuthnTypes, AvailableOAuthProviders } from '@indiebase/sdk';
import { KnexEx, TmplTables } from '@indiebase/server-shared';
import { BusinessLabels, RedisUtils } from '@indiebase/server-shared';
import {
  InternalUser,
  OAuthProvider,
  type PrimitiveProject,
  type PrimitiveUser,
} from '@indiebase/trait';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { FastifyRequest } from 'fastify';
import { Redis } from 'ioredis';
import { Knex } from 'knex';
import { PasetoService } from 'nestjs-paseto';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
    @InjectKnex()
    private readonly knex: Knex,
    private readonly paseto: PasetoService,
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

  public async handleGithubCallback(req: FastifyRequest) {
    // This project is get from query params referenceId
    const {
      user,
      raw: { project },
    } = req;
    const { namespace, referenceId, name } = project;

    if (!user?.profile?._json) {
      throw new InternalServerErrorException('Can not get info from Github');
    }
    const { profile } = user;
    const { _json } = profile;
    return this.knex
      .transaction(async (trx) => {
        const result = await trx
          .withSchema(namespace)
          .insert({
            nickname: profile.displayName,
            email: _json.email,
            authnType: AuthnTypes.oauth2,
          })
          .returning<Pick<InternalUser, 'id' | 'email'>[]>(['id', 'email'])
          .into(TmplTables.users);

        const { id, email } = result[0] ?? Object.create(null);

        await trx
          .withSchema(namespace)
          .insert({
            provider: AvailableOAuthProviders.github,
            accessToken: user['accessToken'],
            refreshToken: user['refreshToken'],
            extraPayload: user['profile'],
            userId: id,
          })
          .into(TmplTables.oauthUserInfo);

        const token = await this.paseto.sign({
          id,
          email,
          project: name,
          referenceId,
          namespace,
        });

        await this.redis.set(
          RedisUtils.createKey(BusinessLabels.accessToken, namespace, id),
          token,
        );

        return token;
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException({
          message: 'An error occurred while sign in with Github',
        });
      });
  }

  public async signIn(user: PrimitiveUser, project: PrimitiveProject) {
    const { namespace, name, referenceId } = project;
    const { email, id, role } = user;

    const token = await this.paseto.sign({
      id,
      email,
      role,
      project: name,
      referenceId,
      namespace,
    });

    await this.redis.set(
      RedisUtils.createKey(BusinessLabels.accessToken, namespace, id),
      token,
    );

    return token;
  }

  public getAuthProvider(namespace, provider: AvailableOAuthProviders) {
    return this.knex
      .withSchema(namespace)
      .select('*')
      .from(TmplTables.oauthProviders)
      .where('name', provider)
      .first<OAuthProvider>();
  }

  public async createOtp(username: string, referenceId: string) {
    const secret = authenticator.generateSecret(20);
    const uri = authenticator.keyuri(username, referenceId, secret);
    const qrcodeUri = await qrcode.toDataURL(uri);

    return {
      secret,
      uri,
      qrcodeUri,
    };
  }

  private createOtpRecoveryCodes(length = 8) {
    return Array.from({ length }).map(() => authenticator.generateSecret(20));
  }

  public async getOtpRecoveryCodes(userId: number, namespace: string) {
    const user = await this.knex
      .withSchema(namespace)
      .where('id', userId)
      .into(TmplTables.users)
      .first<InternalUser>();

    return user.otpRecoveryCodes;
  }

  public async removeOtp(username: string) {
    // return this.userService.repo
    //   .update(
    //     { username },
    //     { optRecoveryCodes: null, optSecret: null, enabled2FA: false },
    //   )
    //   .catch((err) => {
    //     this.logger.error(err);
    //     throw new InternalServerErrorException();
    //   });
  }

  public async enableOtpVerify(
    user: PrimitiveUser,
    namespace: string,
    secret: string,
    token: string,
  ) {
    try {
      const isValid = authenticator.check(token, secret);

      if (isValid) {
        let otpRecoveryCodes = this.createOtpRecoveryCodes();

        await this.knex
          .withSchema(namespace)
          .update({ enabled2FA: true, otpSecret: secret, otpRecoveryCodes })
          .where('id', user.id)
          .into(TmplTables.users);
      }

      return isValid;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
