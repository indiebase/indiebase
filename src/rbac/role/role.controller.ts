import { UserEntity } from '@/rbac';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import { Roles } from './role.decorator';
import { RoleService } from './role.service';
import {
  Controller,
  Post,
  Delete,
  Put,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RolesGuard } from './role.guard';
// import { DefaultRoles, MemoryRoles } from './role.map';
import { CreateRoleDto, DeleteRoleDto, QueryRolesDto } from './role.dto';
import { StatusCode } from '@/common';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles({
  // is: [DefaultRoles.SITE_OWNER],
})
@Controller('role')
export class RoleController {
  constructor(private readonly roleSrv: RoleService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateRoleDto, @Req() req: Request) {
    let message = '创建成功',
      code = StatusCode.SUCCESS;
    // console.log(body);
    await this.roleSrv.createRole(body, req.user as UserEntity).catch((err) => {
      if (err.code === 'ER_DUP_ENTRY') {
        message = '角色名重复';
      }

      code = StatusCode.ERROR;
      console.error(err);
    });

    return {
      code,
      message,
    };
  }

  @Delete('delete')
  @UsePipes(new ValidationPipe())
  async delete(@Body() body: DeleteRoleDto) {
    let message = '删除成功',
      code = StatusCode.SUCCESS;

    const r = await this.roleSrv.delRole(body.id).catch((err) => {
      message = '删除失败';
      code = StatusCode.ERROR;
      console.error(err);
    });

    if (r && r.affected === 0) {
      message = '资源不存在';
      code = StatusCode.ERROR;
    }

    return {
      code,
      message,
    };
  }

  @Put('update')
  @UsePipes(new ValidationPipe())
  async update(@Body() body: CreateRoleDto) {
    let message = '修改成功',
      code = StatusCode.SUCCESS;
    await this.roleSrv.updateRole(body).catch(() => {
      message = '修改失败';
      code = StatusCode.ERROR;
    });
    return {
      code,
      message,
    };
  }

  @Get('query')
  @UsePipes(new ValidationPipe())
  async query(@Body() body: QueryRolesDto) {
    let message,
      code = StatusCode.SUCCESS;
    const data = await this.roleSrv.queryRoles(body).catch((err) => {
      message = '获取角色列表出错';
      code = StatusCode.ERROR;
      console.error(err);
    });

    return {
      code,
      message,
      data,
    };
  }
}
