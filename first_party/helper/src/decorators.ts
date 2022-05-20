import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export function Auth(...roles: []) {
  return applyDecorators(
    SetMetadata('roles', roles),
    // UseGuards(AuthGuard, RolesGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}

/**
 *  Protect 会读取header AS 字段 对接口进行合法校验
 * @returns
 */
export function Protect(): MethodDecorator | ClassDecorator {
  return (target, key, descriptor) => {};
}

/**
 *  Protect 会读取header AS 字段 对接口进行合法校验
 * @returns
 */
export const Protect2 = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
