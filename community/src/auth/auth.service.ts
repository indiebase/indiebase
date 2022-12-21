import { UserService } from '../user/user.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateLocal(username: string, password: string) {
    let user = await this.userService.getUser([{ username }], {
      full: true,
    });

    if (!!user) {
      if (!user.password) {
        throw new UnauthorizedException('Please set your password first');
      }

      if (await bcrypt.compare(password, user.password)) {
        return user;
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
