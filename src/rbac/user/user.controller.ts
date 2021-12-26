// import { UserService } from './user.service';
// import { ALL, Provide, Logger, Inject } from '@midwayjs/decorator';
// import { Validate } from '@midwayjs/decorator';
// import { Body, Controller, Post } from '@midwayjs/decorator';
// import { ILogger } from '@midwayjs/logger';
// import { UserLoginPwdDto, UserRegisterDto } from './user.dto';

// @Provide()
// @Controller('/v1/user')
// export class UserController {
//   @Logger('dash')
//   logger: ILogger;

//   @Inject()
//   userService: UserService;

//   @Post('/register')
//   @Validate()
//   async register(@Body(ALL) body: UserRegisterDto) {
//     // this.userService.

//     return;
//   }

//   @Post('/login')
//   @Validate()
//   async login(@Body(ALL) body: UserLoginPwdDto) {
//     return;
//   }
// }
