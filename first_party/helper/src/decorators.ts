/// <reference types="@fastify/cookie" />

import {
  applyDecorators,
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  LiteralObject,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { DataSource, type EntityTarget } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import validator from 'validator';

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

export const DevApiHeader = function () {
  return applyDecorators(
    ApiHeader({
      name: 'Package-Name',
      description: 'The product package name, same as domain',
      schema: {
        default: 'letscollab.letscollab.deskbtm.com',
      },
    }),
  );
};

export const PackageName = createParamDecorator((_, ctx: ExecutionContext) => {
  const request: any = ctx.switchToHttp().getRequest();

  const domain =
    request.body?.packageName ??
    request.headers?.['package-name'] ??
    request.hostname;

  return domain;
});

@ValidatorConstraint({ name: 'IsEntityExistedConstraint', async: true })
@Injectable()
export class IsEntityExistedConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  validate(value: any, args: ValidationArguments) {
    const entity: EntityTarget<any> = args.constraints[0];
    const key: string = args.constraints[1];
    return this.dataSource
      .getRepository(entity)
      .findOne({
        where: {
          [key]: value,
        },
      })
      .then((e) => {
        return !e;
      });
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.constraints?.[2] ?? 'Entity'} ⌜${
      validationArguments.value
    }⌟ has existed`;
  }
}

/**
 *  Check if the target entity is existed.
 * @param {string} key The database field.
 * @param {ValidationOptions} validationOptions
 */

//TODO: fix https://github.com/nestjs/nest/issues/528
export function IsEntityExisted(
  entity: EntityTarget<LiteralObject>,
  key: string,
  alias?: string,
  validationOptions?: ValidationOptions & {},
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, key, alias],
      validator: IsEntityExistedConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsEmailsConstraint', async: true })
@Injectable()
export class IsEmailsConstraint implements ValidatorConstraintInterface {
  validate(emails: string[], _args: ValidationArguments) {
    return !!emails.find((e) => validator.isEmail(e));
  }
}
