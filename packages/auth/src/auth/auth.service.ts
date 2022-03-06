import { USER_SERVICE_NAME } from '@/app.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { AvailableUserInfo } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_SERVICE_NAME)
    private readonly client: ClientProxy,
    // private readonly config: ConfigService,
  ) {}
  async validateUser(info: AvailableUserInfo): Promise<any> {
    console.log(info, '===========================');
    // const admin = await this.adminSrv.findByNameWithPwd(username);
    // // this.adminSrv.createUser
    // if (admin) {
    //   if (password === admin.password) {
    //     return admin;
    //   } else {
    //     throw new UnauthorizedException('管理员认证错误, 请重新输入密码');
    //   }
    // } else {
    //   if (
    //     username === this.config.get('common.ownerName') &&
    //     password === this.config.get('common.ownerPassword')
    //   ) {
    //   } else {
    //     throw new BadRequestException('管理员不存在或密码错误');
    //   }
    // }
  }

  async signTarget(object: string | Buffer | object) {
    return this.jwtService.sign(object);
  }
}
