import { IAuthModuleOptions } from '@indiebase/nest-fastify-passport';
import { AuthGuard } from '@indiebase/nest-fastify-passport';
import { AvailableOAuthProviders } from '@indiebase/sdk';
import { ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { FastifyRequest } from 'fastify';
import { Profile, Strategy, VerifyCallback } from 'passport-apple';
import url from 'node:url';

@Injectable()
export class AppleGuard extends AuthGuard('apple') {
  constructor(private readonly auth: AuthService) {
    super();
  }

  override async useStrategy(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    if (!req?.raw?.project) {
      throw new UnauthorizedException();
    }

    const {
      raw: { project },
    } = req;

    const { clientId, clientSecret, extraPayload } =
      await this.auth.getAuthProvider(
        project.namespace,
        AvailableOAuthProviders.apple,
      );

    if (!clientId || !clientSecret) {
      throw new UnauthorizedException();
    }

    return new Strategy(
      {
        clientID: clientId,
        clientSecret,
        keyID: '',
        teamID: '',
        passReqToCallback: true,
        callbackURL: url.format({
          protocol: req.protocol,
          pathname: '/v1/auth/oauth/github/callback',
          query: {
            referenceId: project.referenceId,
          },
        }),
      },
      function (
        req: any,
        accessToken: string,
        refreshToken: string,
        idToken: string,
        profile: Profile,
        done: VerifyCallback,
      ) {
        done(null, { accessToken, refreshToken, profile });
      },
    );
  }

  override useAuthenticateOptions(): IAuthModuleOptions<any> {
    return {
      scope: ['user', 'repo', 'admin:org'],
    };
  }

  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err || !user) {
      throw new UnauthorizedException({ message: 'Unauthorized', ...err });
    }

    return user;
  }
}
