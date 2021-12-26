// import { Provide } from '@midwayjs/decorator';
// import { v4 } from 'uuid';

// import { Response } from 'express';
// import { nanoid } from 'nanoid';
// import { UserRegisterDto } from './user.dto';

// @Provide()
// export class UserService {
//   public async register(body: UserRegisterDto) {
//     const { username, captcha } = body;
//     // const user = await this.findByName(username);
//     // const redis = this.redisSrv.getClient();
//     // const captchaKey = Captcha.getRegisterCaptcha(captcha, username);
//     // const c = await redis.get(captchaKey);
//     // if (c) {
//     //   await redis.del(captchaKey);
//     // } else {
//     //   throw new BadRequestException({ message: '验证码错误或失效' });
//     // }
//     // if (!!user) {
//     //   return {
//     //     message: '该用户/邮箱已经注册',
//     //     code: StatusCode.ERROR,
//     //   };
//     // } else {
//     //   const createdUser = await this.createUser(body);
//     //   const uid = nanoid(16);
//     //   createdUser.auth = await this.authSrv.signTarget({
//     //     username,
//     //     t: uid,
//     //   });
//     //   await this.redisSrv.getClient().set(username, uid);
//     // }
//   }
//   // public async purchasedGoods(body: PurchasedGoodsDto & { username: string }) {
//   //   const { packageName, username } = body;
//   //   const data = await this.paymentRepo
//   //     .createQueryBuilder('payment')
//   //     .leftJoinAndSelect('payment.user', 'user')
//   //     .leftJoinAndSelect('payment.goods', 'goods')
//   //     .where('user.username=:username', { username })
//   //     .andWhere('goods.packageName=:packageName', { packageName })
//   //     .getOne();
//   // }
// }
