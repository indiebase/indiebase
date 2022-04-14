import { UserRepository } from './user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '@letscollab/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResultCode } from '@letscollab/common/src/constants';
import { MAIL_RMQ, AUTH_RMQ } from '../app.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(MAIL_RMQ)
    private readonly mailClient: ClientProxy,
  ) {}

  public async signup(body: SignupDto) {
    const user = await this.userRepo.findByAccount(body.account);
    if (user) {
      return {
        message: '该用户/邮箱已经注册',
        code: ResultCode.ERROR,
      };
    }
  }
}
