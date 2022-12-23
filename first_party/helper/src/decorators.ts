/// <reference types="@fastify/cookie" />

import {
  applyDecorators,
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const UserRoles = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user.roles;
  },
);

export const MyInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const session = request.session ?? {};
    return data ? session.user[data] : session.user;
  },
);

export const Cookies = (key: string, signed = false, throwUnsigned = false) => {
  return createParamDecorator((_, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();

    if (!key) return request.cookies;

    const c = request.cookies?.[key];

    if (!signed) return c;

    const v = request.unsignCookie(c);

    if (!v.valid && throwUnsigned) {
      throw new BadRequestException({
        message: `Cookie named ${key} invalid`,
      });
    }

    return v;
  })();
};

export function DevApiHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'Package-Name',
      description: 'The product package name, same as domain',
      schema: {
        default: 'letscollab.letscollab.deskbtm.com',
      },
    }),
  );
}
