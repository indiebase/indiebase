import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import validator from 'validator';
import { KnexEx } from '../knex';

type ExtendedValidationOptions = ValidationOptions & {
  /**
   * `false`: Throw NOT EXIST ERROR if entity doesn't exist , default: true.
   */
  throwExistedMsg?: boolean;

  entityAliasForMsg?: string;
};

@ValidatorConstraint({ name: 'IsEntityExistedConstraint', async: true })
@Injectable()
export class IsEntityExistedConstraint implements ValidatorConstraintInterface {
  constructor(private readonly ex: KnexEx) {}

  validate(value: any, args: ValidationArguments) {
    if (!value || value === '') {
      return true;
    }
    const entity: string = args.constraints[0];
    const key: string = args.constraints[1];
    const { throwExistedMsg } = args
      .constraints[2] satisfies ExtendedValidationOptions;

    return this.ex
      .knex(entity)
      .select(key)
      .then((e) => {
        return throwExistedMsg ? !e : !!e;
      });
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const opt = validationArguments.constraints?.[2];

    return `${opt.entityAliasForMsg} ⌜${validationArguments.value}⌟ ${
      validationArguments.constraints?.[2] ? 'has existed.' : "doesn't exist."
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
  entity: string,
  key: string,
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
      constraints: [entity, key, opt],
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
