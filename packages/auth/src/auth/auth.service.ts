import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, timeout } from 'rxjs';
import { CasbinService } from '@letscollab/nest-acl';
import {
  ResultCode,
  RpcCreateRoleBody,
  RpcResSchemaDto,
  RpcException2Http,
  USER_RMQ,
} from '@letscollab/helper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,
    private readonly logger: Logger,
    private readonly casbin: CasbinService,
  ) {}

  async getUser<T>(cmd: string, c: any) {
    return lastValueFrom<T>(
      this.userClient.send({ cmd }, c).pipe(
        timeout(4000),
        catchError((err) => {
          this.logger.error(err);
          throw new InternalServerErrorException({
            message: 'Failed to get user profile',
          });
        }),
      ),
    );
  }

  // async validateLocal(info: LocalSignInDto) {
  //   let user = await this.getUser<
  //     RpcResSchema<UserEntity & { password: string }>
  //   >('get_complete_name', info.username);

  //   if (user.code > 0) {
  //     if (await bcrypt.compare(info.password, user.d.password)) {
  //       return user.d;
  //     } else {
  //       throw new UnauthorizedException('Wrong password');
  //     }
  //   } else {
  //     throw new NotFoundException(
  //       `${info.username} not existed,  register first plz`,
  //     );
  //   }
  // }

  async signInGithub(data): Promise<RpcResSchemaDto> {
    const r = await lastValueFrom(
      this.userClient.send({ cmd: 'signin_github' }, data.profile).pipe(
        timeout(4000),
        catchError((err) => {
          this.logger.error(err);

          throw RpcException2Http(err);
        }),
      ),
    );

    return r;
  }

  async createRolePolicy(body: RpcCreateRoleBody) {
    for await (const item of body.possession) {
      for (const action of item.action) {
        await this.casbin.e
          .addPolicy(body.name, body.domain, item.resource, action)
          .catch((err) => {
            throw new RpcException({
              code: ResultCode.ERROR,
              message: err,
            });
          });
      }
    }
  }

  async updateRolePolicy(body) {}

  async attachRoleForUser({ username, rolename, domain }) {
    return this.casbin.e
      .addRoleForUser(username, rolename, domain)
      .catch((err) => {
        this.logger.error(err);

        throw new RpcException({
          code: ResultCode.ERROR,
          message: err,
        });
      });
  }
}
