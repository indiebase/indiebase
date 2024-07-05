import { ExecutionContext, Query, ValidationPipe } from '@nestjs/common';
import { BadRequestException, createParamDecorator } from '@nestjs/common';

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
    return property ? request.raw.project?.[property] : request.raw?.project;
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

export const QueryEx = () =>
  Query(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
