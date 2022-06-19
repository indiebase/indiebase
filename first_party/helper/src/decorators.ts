/// <reference types="fastify-cookie" />

import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const UserRoles = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user.roles;
  },
);

export const ExtractJWT = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user.a_t;
  },
);

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);

export const Cookies = (key: string, signed = false, throwUnsigned = false) => {
  return createParamDecorator((_, ctx: ExecutionContext) => {
    const request: FastifyRequest = ctx.switchToHttp().getRequest();

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
