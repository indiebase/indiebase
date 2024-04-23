import { X_Indiebase_AP, X_Indiebase_Project_ID } from '@indiebase/sdk';
import { ExecutionContext } from '@nestjs/common';
import {
  applyDecorators,
  BadRequestException,
  createParamDecorator,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  ErrResponseSchema,
  OkResponseSchema,
  PaginationResponseSchema,
} from '../dto';

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
      'Indiebase Project ID. e.g. 4b3643f67affc66d. `indiebase` is a specific value for manager API',
    required: true,
    schema: {
      default: 'indiebase',
    },
  });

export const ApiProjectParam = () =>
  ApiParam({
    name: 'projectId',
    description:
      'Indiebase Project ID in URL Parameters. e.g. ?projectId=4b3643f67affc66d, `indiebase` is a specific value for manager API',
    schema: {
      default: 'indiebase',
    },
  });

/**
 * Need a paseto token to Sign in and X-Indiebase-AP to protect API.
 * @returns
 */
export const ApiIndiebaseSecurity = () =>
  // ApiSecurity('ap') provides api protection.
  applyDecorators(ApiSecurity('ap'), ApiProtectionHeader());

/**
 * Required. specific project.
 * @returns
 */
export const ApiProject = () =>
  // ApiSecurity('ap') provides api protection.
  applyDecorators(ApiProjectHeader(), ApiProjectParam());

/**
 * Common API headers. Type 1.
 *
 * Includes
 * - ApiSecurity('ap')
 * - ApiProtectionHeader
 * - ApiProjectHeader
 */
export const ApiUnionType1Header = () =>
  applyDecorators(ApiProject(), ApiIndiebaseSecurity());

export const ApiUnionResponse = (okType?: 'pagination') => {
  let okSchema;
  switch (okType) {
    case 'pagination':
      okSchema = PaginationResponseSchema;
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
      type: ErrResponseSchema,
    }),
    ApiForbiddenResponse({
      type: ErrResponseSchema,
    }),
    ApiInternalServerErrorResponse({
      type: ErrResponseSchema,
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

/**
 * Get authenticated user info.
 *
 * @example
 * ```ts
 * demo(@User() user: PrimitiveUser){}
 * demo(@User('name') name: string){}
 * ```
 */
export const User = createParamDecorator(
  (property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    //
    return property ? request.user?.[property] : request.user;
  },
);

/**
 * Get authenticated role info.
 *
 * @example
 * ```ts
 * demo(@Role() role){}
 * ```
 */
export const Role = createParamDecorator(
  (_property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.role;
  },
);

/**
 * Get authenticated role info.
 *
 * @example
 * ```ts
 * demo(@Project() project: PrimitiveProject){}
 * ```
 */
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
