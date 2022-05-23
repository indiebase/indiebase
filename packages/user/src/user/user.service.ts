import { UserRepository } from './user.repository';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '@letscollab/helper';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ResultCode } from '@letscollab/helper';
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
    private readonly logger: Logger,
  ) {}

  public async signup(body: SignupDto) {
    const user = await this.userRepo.findByAccount(body.account);

    if (user) {
      return {
        code: ResultCode.ERROR,
        message: '该用户/邮箱已经注册',
      };
    } else {
      return this.userRepo
        .createUser(body)
        .then((d) => {
          return {
            code: ResultCode.SUCCESS,
            message: '注册成功',
            d,
          };
        })
        .catch((err) => {
          this.logger.error(err.message, err.stack);

          throw new RpcException({
            code: ResultCode.ERROR,
            message: err.code === 'ER_DUP_ENTRY' ? '用户已存在' : err.message,
          });
        });
    }
  }

  public async getFull(account: string) {
    return this.userRepo.findFullByAccount(account).catch((err) => {
      this.logger.error(err.message, err.stack);

      throw new RpcException({
        code: ResultCode.ERROR,
        message: err.message,
      });
    });
  }
}
