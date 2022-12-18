import { Strategy } from 'passport-local';
import {
  PassportStrategy,
  StaticPassportStrategy,
} from '@letscollab-nest/fastify-passport';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  awaitValue,
  RpcException2Http,
  RpcResSchemaDto,
  USER_RMQ,
} from '@letscollab-nest/helper';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy, 'local')
  implements StaticPassportStrategy
{
  constructor(
    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,
  ) {
    super();
  }

  async useStaticOptions() {
    return {};
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await awaitValue<RpcResSchemaDto>(
      this.userClient,
      {
        cmd: 'get_complete_name',
      },
      (err) => {
        throw RpcException2Http(err);
      },
    );

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
}
