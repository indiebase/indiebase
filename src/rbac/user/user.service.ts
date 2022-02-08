import { ConfigService } from '@nestjs/config';

import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '@/auth/auth.service';

import {
  StatusCode,
  requestJAccount,
  requestJacApi,
  SJTUCommonResponse,
  JAccountAuth,
} from '@/common';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { stringify } from 'querystring';
import { Repository, Like } from 'typeorm';

import { UserEntity } from './user.entity';
import { QueryUserDto, UserLoginDto, EditUserDto } from './user.dto';
import { JwtPayload } from '@/auth/auth.interface';

@Injectable()
export class UserService {
  private grant_type = 'authorization_code';

  constructor(
    private readonly configSrv: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authSrv: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  // 'grant_type=authorization_code&redirect_uri=https%3A%2F%2F127.0.0.1%3A6666%2Fauth1%2Fgitlab-cb&client_id=a545d36e1ce803efbdff0208197a7df7afaf4dbc7f2e6c5cb1b6598b6b416aae&client_secret=96d12cf3cbedcea1dc1031ae351b2672182d9a89677ccaa355db56357af4d4bc&code=b36c00ed9ca11e6a891b04dbcc901af935b2c8d1466f2d88720572892767028a';

  public async handleLoginWithCode(body: UserLoginDto) {
    const res = await this.fetchTokenFromJAccount({
      grant_type: this.grant_type,
      client_id: this.configSrv.get('common.clientId'),
      client_secret: this.configSrv.get('common.clientSecret'),
      redirect_uri: body.redirect_uri,
      code: body.code,
    });

    let message = '登录成功',
      code = StatusCode.SUCCESS;

    if (res) {
      const body = await this.fetchProfileFromJaccount(res.access_token);
      const profile = body.entities ? body.entities[0] : {};

      if (body.errno === 0) {
        const userEntity = this.userRepo.create({
          account: profile.account,
          username: profile.name,
        });

        const u = await this.userRepo.findOne({ account: profile.account });

        if (!u) {
          await this.userRepo.save(userEntity).catch((err) => {
            code = StatusCode.ERROR;
            message = '服务器内部错误, 联系管理员';

            if (err.code === 'ER_DUP_ENTRY') {
              message = '用户已存在';
            }

            console.error(err);
          });
        }

        const t = await this.authSrv.signTarget<JwtPayload>({
          a_t: res.access_token,
          r_t: res.refresh_token,
          account: profile.account,
        });

        if (code > 0) {
          return {
            code,
            message,
            data: {
              t,
              j_ac: res.access_token,
              ...u,
              profile,
            },
          };
        }
      } else {
        code = StatusCode.ERROR;
        message = '获取用户信息失败';
      }
    } else {
      code = StatusCode.ERROR;
      message = '获取JAccount信息失败';
    }
    return { code, message };
  }

  private async fetchProfileFromJaccount(
    access_token: string,
  ): Promise<SJTUCommonResponse> {
    const res = await requestJacApi.get('v1/me/profile', {
      searchParams: {
        access_token,
      },
    });

    return res.body as any;
  }

  private async fetchTokenFromJAccount(body: any): Promise<JAccountAuth> {
    const res = await requestJAccount
      .post('oauth2/token', {
        body: stringify(body),
      })
      .catch((err) => {
        console.error(err);
      });

    return res ? (res.body as any) : null;
  }

  public async getUserProfile(token: string) {
    const body = await this.fetchProfileFromJaccount(token);

    if (body.errno === 0) {
      const jaccount = body.entities ? body.entities[0] : {};
      const u = await this.userRepo.findOne({ account: jaccount.account });
      return {
        ...u,
        jaccount,
      };
    }
  }

  public async queryUsers(query: QueryUserDto) {
    query = Object.assign({}, { pageSize: 20, current: 1 }, query);
    const { account, id, disable } = query;
    const condition = [];
    account && condition.push({ account: Like(`%${account}%`) });
    id && condition.push({ id });
    disable && condition.push({ disable });

    try {
      const [list, total] = await this.userRepo.findAndCount({
        where: condition,
        skip: (query.current - 1) * query.pageSize,
        take: query.pageSize,
      });
      return {
        list,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(body: EditUserDto) {
    const { id, ...rest } = body;

    return this.userRepo.update({ id }, rest);
  }
}
