import { USER_RMQ } from '../app.constants';
import { RpcResSchema } from '@letscollab/helper';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, timeout } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { LocalSignInDto } from './auth.dto';
import { UserEntity } from '@letscollab/user';
import { CasbinService } from '@letscollab/nest-acl';

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
        catchError((e) => {
          throw new InternalServerErrorException({
            message: '获取用户信息失败',
          });
        }),
      ),
    );
  }

  async validateLocal(info: LocalSignInDto) {
    let user = await this.getUser<
      RpcResSchema<UserEntity & { password: string }>
    >('get_complete_name', info.username);

    if (user.code > 0) {
      if (await bcrypt.compare(info.password, user.d.password)) {
        return user.d;
      } else {
        throw new UnauthorizedException('Wrong password');
      }
    } else {
      throw new NotFoundException(
        `${info.username} not existed,  register first plz`,
      );
    }
  }

  async signupGithub(data) {
    const r = await lastValueFrom(
      this.userClient.send({ cmd: 'signup_github' }, data.profile).pipe(
        timeout(4000),
        catchError((e) => {
          throw new InternalServerErrorException({
            message: 'Fail to register',
          });
        }),
      ),
    );

    return r;
  }

  async setRolePolicy(args) {
    console.log(args);
    // const a = await this.casbin.e.addPolicy().catch(() => {
    //   throw new InternalServerErrorException({
    //     message: 'Fail to register',
    //   });
    // });
  }

  public async addRole() {
    // this.casbin.e.addPolicies();
  }
}
