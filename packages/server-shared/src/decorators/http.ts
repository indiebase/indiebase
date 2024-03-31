import { X_Indiebase_AP, X_Indiebase_Project_ID } from '@indiebase/sdk';
import { ExecutionContext } from '@nestjs/common';
import {
  applyDecorators,
  BadRequestException,
  createParamDecorator,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ErrorResSchema, OkResponseSchema, PaginationResSchema } from '../dto';

export const ApiProtectionHeader = () =>
  ApiHeader({
    name: X_Indiebase_AP,
    description: 'Protect public APIs',
    required: true,
    schema: {
      default: '1711726948199;dev;057a041a310de100868068c2ab3b30dd',
    },
  });

export const ApiProjectHeader = () =>
  ApiHeader({
    name: X_Indiebase_Project_ID,
    description:
      'Indiebase Project ID. e.g. 4b3643f67affc66d.`mgr` is a specific value for manager API',
    required: true,
    schema: {
      default: 'mgr',
    },
  });

export const ApiIndiebaseCommonHeader = () =>
  applyDecorators(ApiProjectHeader(), ApiProtectionHeader());

export const ApiIndiebaseSecurity = () =>
  // ApiSecurity('ap') provides api protection.
  applyDecorators(ApiBearerAuth('paseto'), ApiSecurity('ap'));

export const ApiUnionResponse = (okType?: 'pagination') => {
  let okSchema;
  switch (okType) {
    case 'pagination':
      okSchema = PaginationResSchema;
      break;
    default:
      okSchema = OkResponseSchema;
      break;
  }

  return applyDecorators(
    ApiOkResponse({
      type: okSchema,
    }),
    ApiUnauthorizedResponse({
      type: ErrorResSchema,
    }),
    ApiForbiddenResponse({
      type: ErrorResSchema,
    }),
    ApiInternalServerErrorResponse({
      type: ErrorResSchema,
    }),
  );
};

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
    //
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
