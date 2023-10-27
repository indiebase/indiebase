import { is } from '@deskbtm/gadgets/is';
import { InjectKnex } from '@indiebase/nest-knex';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  PipeTransform,
  UseInterceptors,
  UsePipes,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
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
import { Observable } from 'rxjs';
import validator from 'validator';
import { AsyncContext } from '@indiebase/nest-async-context';
import { type FastifyRequest } from 'fastify';
import { X_Indiebase_Project_ID } from '../../../sdk/src';

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

interface SpecificProject {
  type: 'specificProject';
  schema?: string;
  table: string;
  column: string;
}

interface SpecificProjectFromHeader {
  type: 'specificProjectFromHeader';
  header: string;
  table: string;
  column: string;
  $ifEq?: Record<string, Omit<SpecificProject, 'type'>>;
}

type Entity = SpecificProject | SpecificProjectFromHeader;

export const REQUEST_CONTEXT = '_requestContext';

export interface ExtendedValidationArguments extends ValidationArguments {
  object: {
    [REQUEST_CONTEXT]: {};
  };
}

@ValidatorConstraint({ name: 'IsEntityExistedConstraint', async: true })
@Injectable()
export class IsEntityExistedConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  #resultHandler(throwExistedMsg: boolean) {
    return function (value: any[]) {
      return Array.isArray(value) && value.length > 0
        ? !throwExistedMsg
        : throwExistedMsg;
    };
  }

  validate(value: any, args: ExtendedValidationArguments) {
    if (!value || value === '') {
      return true;
    }

    console.log('validate');
    return true;
    const entity: Entity = args.constraints[0];
    const { throwExistedMsg } = args
      .constraints[1] satisfies ExtendedValidationOptions;

    switch (entity?.type) {
      case 'specificProjectFromHeader': {
        const e = entity as SpecificProjectFromHeader;
        const req = AsyncContext.current<FastifyRequest, any>().request;
        req.headers[X_Indiebase_Project_ID];

        // this.knex
        //   .withSchema(e.schema ?? 'public')
        //   .select('*')
        //   .from(e.table)
        //   .where(e.column, value)
        //   .then(this.#resultHandler(throwExistedMsg));

        // return this.knex
      }
      case 'specificProject':
      default: {
        const e = entity as SpecificProject;
        return this.knex
          .withSchema(e.schema ?? 'public')
          .select('*')
          .from(e.table)
          .where(e.column, value)
          .then(this.#resultHandler(throwExistedMsg));
      }
    }
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
      name: 'IsEntityExisted',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, opt],
      validator: IsEntityExistedConstraint,
    });
  };
}

@Injectable()
export class InjectUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    console.log('@@@@', request);

    return next.handle();
  }
}

@Injectable()
export class StripRequestContextPipe implements PipeTransform {
  transform(value: any) {
    console.log('@#####', value);
    return value;
  }
}

export function EntityExistedPipe() {
  return applyDecorators(
    UseInterceptors(InjectUserInterceptor),
    UsePipes(StripRequestContextPipe),
  );
}

export const XHeadersPipe = createParamDecorator(
  async (property: string | number | symbol, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    if (
      typeof property === 'string' ||
      typeof property === 'number' ||
      typeof property === 'symbol'
    ) {
      return headers[property];
    }

    return headers;
  },
);

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
