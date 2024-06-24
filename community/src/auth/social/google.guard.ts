import { AvailableOAuthProviders } from '@indiebase/sdk';
import { IAuthModuleOptions } from '@indiebase/nest-fastify-passport';
import { AuthGuard } from '@indiebase/nest-fastify-passport';
import { ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { FastifyRequest } from 'fastify';
import url from 'node:url';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
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

    const { clientId, clientSecret } = await this.auth.getAuthProvider(
      project.namespace,
      AvailableOAuthProviders.google,
    );

    if (!clientId || !clientSecret) {
      throw new UnauthorizedException();
    }

    return new Strategy(
      {
        clientID: clientId,
        clientSecret,
        callbackURL: url.format({
          protocol: req.protocol,
          pathname: '/v1/auth/oauth/google/callback',
          query: {
            referenceId: project.referenceId,
          },
        }),
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any,
      ) {
        done(null, { accessToken, refreshToken, profile });
      },
    );
  }

  override useAuthenticateOptions(): IAuthModuleOptions {
    return {
      scope: ['email', 'profile'],
    };
  }

  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err || !user) {
      throw new UnauthorizedException({ message: 'Unauthorized', ...err });
    }

    return user;
  }
}
