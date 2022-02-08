import { UserEntity } from '@/rbac';
import { UserService } from '@/rbac/user/user.service';
import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userSrv: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    username: string,
    pwd: string,
  ): Promise<UserEntity | never> {
    return 1 as any;
    // const user = await this.userSrv.findByNameWithPwd(username);
    // if (user) {
    //   if (await bcrypt.compare(pwd, user.password)) {
    //     return user;
    //   } else {
    //     throw new UnauthorizedException('用户认证错误, 请重新输入密码');
    //   }
    // } else {
    //   throw new BadRequestException('用户不存在, 请先注册');
    // }
  }

  async signTarget<T extends {}>(object: T) {
    return this.jwtService.sign(object, {});
  }
}
