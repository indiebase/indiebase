import { X_Indiebase_AC, X_Indiebase_Project_ID } from '../../../sdk/src';
import {
  BadRequestException,
  ExecutionContext,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { type ClzType } from '../utils';

export const DevApiHeader = function () {
  return applyDecorators(
    ApiHeader({
      name: 'Domain',
      description: 'The product package name, same as domain',
      schema: {
        default: 'com.deskbtm.indiebase',
      },
    }),
  );
};

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
    description: 'Indiebase Project ID',
    required: true,
    schema: {
      default: 'indiebase',
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

    return property ? request[property] : request.user;
  },
);

export const UserRoles = createParamDecorator(
  (property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return property ? request.user[property] : request.user.roles;
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
