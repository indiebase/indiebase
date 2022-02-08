import { QueryUserDto, EditUserDto } from './user.dto';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
  Get,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserLoginDto } from './user.dto';
import { StatusCode, UserAccessToken } from '@/common';
import { Roles, RolesGuard } from '@/rbac/role';

@Controller('user')
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Post('login')
  @ApiBody({ type: [UserLoginDto] })
  @UsePipes(new ValidationPipe())
  async registerCustomer(@Body() body: UserLoginDto) {
    return this.userSrv.handleLoginWithCode(body);

    /**
     * 封印cookie
     */
    // const jac = result.data?.j_ac,
    //   t = result.data?.t;
    // if (jac && t) {
    //   const cookieOption = {
    //     expires: new Date(Date.now() + 900000),
    //   };

    //   res.cookie('j_ac', jac, cookieOption);
    //   res.cookie('t', t, cookieOption);
    // }
    // res.send(result);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@UserAccessToken() token) {
    let message,
      code = StatusCode.SUCCESS;

    const data = await this.userSrv.getUserProfile(token).catch((err) => {
      console.debug(err);
      throw new UnauthorizedException({
        message: '用户信息获取失败',
        code: StatusCode.ERROR,
      });
    });

    return {
      code,
      message,
      data,
    };
  }

  @Get('query')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles({
    is: ['demo'],
    can: ['create'],
    to: 'own',
  })
  async query(@Query() query: QueryUserDto) {
    let message,
      code = StatusCode.SUCCESS;

    const data = await this.userSrv.queryUsers(query).catch((err) => {
      message = '查询失败';
      code = StatusCode.ERROR;
      console.error(err);
    });

    return {
      code,
      message,
      data,
    };
  }

  @Roles({
    is: ['demo'],
    can: ['create'],
    to: 'own',
  })
  @Put('edit')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '管理员编辑用户' })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async edit(@Body() body: EditUserDto) {
    let message = '用户更新成功',
      code = StatusCode.SUCCESS;

    await this.userSrv.updateUser(body).catch((err) => {
      message = '用户更新失败';
      code = StatusCode.ERROR;
      console.error(err);
    });

    return {
      code,
      message,
    };
  }
}
