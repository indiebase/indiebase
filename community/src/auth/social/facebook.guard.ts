import { AvailableOAuthProviders } from '@indiebase/sdk';
import { IAuthModuleOptions } from '@indiebase/nest-fastify-passport';
import { AuthGuard } from '@indiebase/nest-fastify-passport';
import { ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';
import { FastifyRequest } from 'fastify';
import { formatAuthProviderCallbackURL } from '@indiebase/server-shared';

@Injectable()
export class FacebookGuard extends AuthGuard('facebook') {
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
      AvailableOAuthProviders.facebook,
    );

    if (!clientId || !clientSecret) {
      throw new UnauthorizedException();
    }

    return new Strategy(
      {
        clientID: clientId,
        clientSecret,
        callbackURL: formatAuthProviderCallbackURL(
          AvailableOAuthProviders.facebook,
          req.protocol,
          req.hostname,
          project.referenceId,
        ),
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
