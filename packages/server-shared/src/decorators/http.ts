import { X_Indiebase_AC, X_Indiebase_Project_ID } from '@indiebase/sdk';
import type {
  ExecutionContext} from '@nestjs/common';
import {
  applyDecorators,
  BadRequestException,
  createParamDecorator
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const ProtectApiHeader = () =>
  ApiHeader({
    name: X_Indiebase_AC,
    description: 'Protect public APIs',
    required: true,
    schema: {
      default: '0000000000;dev;2cb919284dc284f4994fcd064ef0542b',
    },
  });

export const ProjectApiHeader = () =>
  ApiHeader({
    name: X_Indiebase_Project_ID,
    description:
      'Indiebase Project ID. e.g. 4b3643f67affc66d.`mgr` is a specific value for manager API',
    required: true,
    schema: {
      default: 'mgr',
    },
  });

export const CommonApiHeader = () =>
  applyDecorators(ProjectApiHeader(), ProtectApiHeader());

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

export const User = createParamDecorator(
  (property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return property ? request.user?.[property] : request.user;
  },
);

export const Role = createParamDecorator(
  (_property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.role;
  },
);

export const Project = createParamDecorator(
  (property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return property ? request.raw.project?.[property] : request?.raw.project;
  },
);

export const Domain = createParamDecorator((_, ctx: ExecutionContext) => {
  const request: any = ctx.switchToHttp().getRequest();

  return (
    request.body?.domain ??
    request.headers?.['domain'] ??
    request.hostname?.split('.').reverse().join('.')
  );
});
