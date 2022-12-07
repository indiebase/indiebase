import { UserEntity } from '../user/user.entity';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserExistedConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}
  validate(username: any, args: ValidationArguments) {
    const { email } = args.object as any;

    return this.dataSource
      .getRepository(UserEntity)
      .findOne({
        where: [
          {
            username,
          },
          {
            email,
          },
        ],
      })
      .then((user) => {
        return !user;
      });
  }
}

/**
 *
 * @deprecated
 * @param {ValidationOptions} validationOptions
 */
export function IsUserExisted(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistedConstraint,
    });
  };
}
