import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard<User extends { roles?: any[] }> implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  protected async getUser(context: ExecutionContext): Promise<User> {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }

  protected async getUserRoles(context: ExecutionContext): Promise<any> {
    const user = await this.getUser(context);
    if (!user) throw new UnauthorizedException();
    return user.roles;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      let roles = this.reflector.get<any[]>('roles', context.getClass());
      console.log(roles);
      if (!roles) {
        roles = this.reflector.get<any[]>('roles', context.getHandler());
      }

      // if (!roles) {
      //   return false;
      // }

      const userRoles = await this.getUserRoles(context);

      console.log(userRoles, roles);

      // const hasRoles = roles.every((role) => {
      //   const queryInfo: IQueryInfo = role;
      //   queryInfo.role = userRoles;
      //   const permission = this.roleBuilder.permission(queryInfo);
      //   return permission.granted;
      // });
      // return hasRoles;
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
