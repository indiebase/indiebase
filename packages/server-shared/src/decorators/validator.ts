import { is } from '@deskbtm/gadgets/is';
import { AsyncContext } from '@indiebase/nest-async-context';
import { InjectKnex } from '@indiebase/nest-knex';
import { X_Indiebase_Project_ID } from '@indiebase/sdk';
import { applyDecorators, Injectable, NotFoundException } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  IsString,
  Matches,
  registerDecorator,
  ValidatorConstraint,
} from 'class-validator';
import { IncomingMessage } from 'http';
import { Knex } from 'knex';

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

export enum SpecificProjectType {
  hardCode = 'hardCode',
  fromHeader = 'fromHeader',
}

interface SpecificProject {
  type?: SpecificProjectType.hardCode;
  schema?: string;
  table: string;
  column: string;
}

interface SpecificProjectFromHeader {
  type: SpecificProjectType.fromHeader;
  table: string;
  column: string;
  $eq?: Record<string, Omit<SpecificProject, 'type'>>;
}

type Entity = SpecificProject | SpecificProjectFromHeader;

@ValidatorConstraint({ name: 'IsEntityExistedConstraint', async: true })
@Injectable()
export class IsEntityExistedConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  private resultHandler(throwExistedMsg: boolean) {
    return function (value: any[]) {
      return Array.isArray(value) && value.length > 0
        ? !throwExistedMsg
        : throwExistedMsg;
    };
  }

  private async entityExist(
    schema: string,
    table: string,
    column: string,
    value: any,
    handler: any,
  ): Promise<boolean> {
    return this.knex
      .withSchema(schema)
      .select('*')
      .from(table)
      .where(column, value)
      .then(handler);
  }

  async validate(value: any, args: ValidationArguments) {
    if (!value || value === '') {
      return true;
    }

    const entity: Entity = args.constraints[0];
    const { throwExistedMsg } = args
      .constraints[1] satisfies ExtendedValidationOptions;

    switch (entity?.type) {
      case SpecificProjectType.fromHeader: {
        const e = entity as SpecificProjectFromHeader;
        const req = AsyncContext.current().request;
        const project = req.project;
        const projectId = req.headers[X_Indiebase_Project_ID];

        if (!project) {
          throw new NotFoundException(`Project ${projectId} not found`);
        }

        if (e.$eq) {
          const conditions = Object.entries(e.$eq);
          for (const [name, cond] of conditions) {
            if (project.name === name) {
              return this.entityExist(
                name,
                cond.table,
                cond.column,
                value,
                this.resultHandler(throwExistedMsg),
              );
            }
          }
        }

        return this.entityExist(
          project.namespace,
          e.table,
          e.column,
          value,
          this.resultHandler(throwExistedMsg),
        );
      }
      case SpecificProjectType.hardCode:
      default: {
        const e = entity as SpecificProject;
        return this.entityExist(
          e.schema,
          e.table,
          e.column,
          value,
          this.resultHandler(throwExistedMsg),
        );
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
 * Check if the target entity is existed.
 *
 * 1. Check entity from by hardcode database schema.
 * 2. Check entity through x-indiebase-project-id header to get database schema.
 *
 * @param {Entity} entity.
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

/**
 * Check illegal strings
 *
 * @param {ValidationOptions} options
 * @returns
 */
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
