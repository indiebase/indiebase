import { is } from '@deskbtm/gadgets/is';
import { InjectKnex } from '@indiebase/nest-knex';
import { Injectable, applyDecorators } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  Matches,
  IsString,
} from 'class-validator';
import { Knex } from 'knex';
import validator from 'validator';

type ExtendedValidationOptions = ValidationOptions & {
  /**
   * `false`: Throw NOT EXIST ERROR if entity doesn't exist , default: true.
   */
  throwExistedMsg?: boolean;

  entityAliasForMsg?: string;
  /**
   * Custom response message.
   */
  message?: ((value: any) => string) | string;
};

interface Entity {
  schema?: string;
  table: string;
  column: string;
}

@ValidatorConstraint({ name: 'IsEntityExistedConstraint', async: true })
@Injectable()
export class IsEntityExistedConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  validate(value: any, args: ValidationArguments) {
    if (!value || value === '') {
      return true;
    }
    const entity: Entity = args.constraints[0];
    const { throwExistedMsg } = args
      .constraints[1] satisfies ExtendedValidationOptions;

    return this.knex
      .withSchema(entity.schema ?? 'public')
      .select('*')
      .from(entity.table)
      .where(entity.column, value)
      .then((v) => {
        return Array.isArray(v) && v.length > 0
          ? !throwExistedMsg
          : throwExistedMsg;
      });
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const opt = validationArguments
      .constraints?.[1] as ExtendedValidationOptions;

    const msg = is.function(opt.message)
      ? opt.message(validationArguments.value)
      : opt.message;

    //T
    return opt.message
      ? msg
      : `${opt.entityAliasForMsg} ⌜${validationArguments.value}⌟ ${
          opt.throwExistedMsg ? 'already existed.' : "doesn't exist."
        }`;
  }
}

/**
 *  Check if the target entity is existed.
 * @param {string} key The database field.
 * @param {ValidationOptions} validationOptions
 */

// TODO: fix https://github.com/nestjs/nest/issues/528
export function IsEntityExisted(
  entity: Entity,
  validationOptions?: ExtendedValidationOptions,
) {
  const opt = Object.assign(
    {},
    { throwExistedMsg: true, entityAliasForMsg: 'Entity' },
    validationOptions,
  );

  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, opt],
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

export function IsCommonLegalString(options?: ValidationOptions) {
  options = Object.assign(
    {},
    //T
    {
      message:
        '$value is illegal, only allow ASCII letters, digits, and the characters - and _',
    },
    options,
  );

  return applyDecorators(
    IsString(options),
    Matches(/^[a-zA-Z0-9_-]+$/gi, options),
  );
}
