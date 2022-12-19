import { UserService } from '../user/user.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CasbinService } from '@letscollab-nest/accesscontrol';
import { ResultCode } from '@letscollab-nest/helper';
import { RpcCreateRoleBody } from '@letscollab-nest/trait';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly casbin: CasbinService,
    private readonly userService: UserService,
  ) {}

  async validateLocal(username: string, password: string) {
    let user = await this.userService.getUser([{ username: username }], {
      full: true,
    });

    if (user.code > 0) {
      const { d: data } = user;

      if (!user.d.password) {
        throw new UnauthorizedException('Please set your password first');
      }

      if (await bcrypt.compare(password, data.password)) {
        return data;
      } else {
        throw new UnauthorizedException('Wrong password');
      }
    } else {
      throw new NotFoundException(
        `User ${username} not existed,  register first plz`,
      );
    }
  }

  async createRolePolicy(body: RpcCreateRoleBody) {
    for await (const item of body.possession) {
      for (const action of item.action) {
        await this.casbin.e
          .addPolicy(body.name, body.domain, item.resource, action)
          .catch((err) => {
            throw new InternalServerErrorException({
              code: ResultCode.ERROR,
              message: err,
            });
          });
      }
    }
  }

  async updateRolePolicy(body: any) {}

  async attachRoleForUser({ username, rolename, domain }: any) {
    return this.casbin.e
      .addRoleForUser(username, rolename, domain)
      .catch((err) => {
        this.logger.error(err);

        throw new InternalServerErrorException({
          code: ResultCode.ERROR,
          message: err,
        });
      });
  }
}
