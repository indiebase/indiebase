import { UserService } from '../user/user.service';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CasbinService } from '@letscollab-nest/accesscontrol';

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
}
