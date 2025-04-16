import { X_Indiebase_AP, X_Indiebase_Reference_Id } from '@indiebase/sdk';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponseOptions,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { INDIEBASE_MGR } from '../constants';
import {
  ErrResponseSchema,
  OkedResponseSchema,
  PaginatedResponseSchema,
} from '../dto';

export type OkedType = 'paginated' | 'created' | 'oked' | 'array' | null;

export type ApiUnionResponseOptions<TModel extends Type<any> | string = any> =
  ApiResponseOptions & {
    bodyProperties?: SchemaObject | ReferenceObject | null;
    okedType?: OkedType | null;
    model?: TModel;
  };

export const ApiProtectionHeader = () =>
  ApiHeader({
    name: X_Indiebase_AP,
    description: 'Protect public APIs',
    required: true,
    schema: {
      default: '1711726948199;dev;057a041a310de100868068c2ab3b30dd',
    },
  });

/**
 * Required. specific project.
 * @returns
 */
export const ApiProjectHeader = () =>
  ApiHeader({
    name: X_Indiebase_Reference_Id,
    description:
      'Indiebase Project ID. e.g. 4b3643f67affc66d. `indiebase_mgr` is a specific value for manager API',
    required: true,
    schema: {
      default: INDIEBASE_MGR,
    },
  });

/**
 * Preset project reference id for development
 *
 * @param name - parma name
 * @param value - param value
 * @returns
 */
export const ApiPresetParam = (
  name = 'referenceId',
  value: string = INDIEBASE_MGR,
) =>
  ApiParam({
    name,
    type: 'string',
    schema: {
      default: value,
    },
  });

/**
 * Need a paseto token to Sign in and X-Indiebase-AP to protect API.
 * @returns
 */
export const ApiIndiebaseSecurity = () =>
  // ApiSecurity('ap') provides api protection.
  applyDecorators(ApiProtectionHeader());

/**
 * OpenAPI pagination response.
 * @param model
 * @returns
 *
 * @deprecated
 */
export const ApiPaginatedResponse = <TModel extends Type<any> = any>(
  options: ApiUnionResponseOptions<TModel>,
) => {
  let bodyProperties;
  const { model, ...restOptions } = options;
  const models = [PaginatedResponseSchema];
  if (model) {
    bodyProperties = {
      type: 'array',
      items: { $ref: getSchemaPath(model) },
      description: 'Response data list',
    };

    models.push(model);
  }

  const decorators = [
    ApiExtraModels(...models),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseSchema) },
          {
            properties: {
              body: {
                ...bodyProperties,
              },
            },
          },
        ],
      },
      ...restOptions,
    }),
  ].filter(Boolean);

  return applyDecorators(...decorators);
};

const getItems = <T extends Type<any> | string>(model?: T) => {
  const items =
    typeof model === 'function'
      ? {
          $ref: getSchemaPath(model),
        }
      : { type: model };

  return items as SchemaObject | ReferenceObject;
};

export const ApiOkedResponse = <TModel extends Type<any> | string = any>(
  options: ApiUnionResponseOptions<TModel>,
) => {
  const { model, okedType, ...restOptions } = options;
  let schema: Type<any> = OkedResponseSchema;
  let bodyProperties:
    | { body: SchemaObject | ReferenceObject | undefined }
    | undefined = model && {
    body: {
      $ref: getSchemaPath(model),
      description: 'Response data',
    },
  };

  let Api = ApiOkResponse;
  const items = getItems(model);

  switch (okedType) {
    case 'created':
      Api = ApiCreatedResponse;
      break;
    case 'array':
      bodyProperties = model && {
        body: {
          type: 'array',
          items,
          description: 'Response data list',
        },
      };
      break;
    case 'paginated':
      bodyProperties = model && {
        body: {
          type: 'array',
          items,
          description: 'Response paginated data list',
        },
      };
      schema = PaginatedResponseSchema;
      break;
    default:
      break;
  }

  const models = [schema, model].filter(Boolean) as Type<any>[];
  const decorators = [
    ApiExtraModels(...models),
    Api({
      schema: {
        allOf: [
          { $ref: getSchemaPath(schema) },
          {
            properties: {
              ...bodyProperties,
            },
          },
        ],
      },
      ...restOptions,
    }),
  ];

  return applyDecorators(...decorators);
};

/**
 * Common API headers. Type 1.
 *
 * Includes
 * - ApiSecurity('ap')
 * - ApiProtectionHeader
 * - ApiProjectHeader
 */
export const ApiUnionType1Header = () =>
  applyDecorators(ApiProjectHeader(), ApiIndiebaseSecurity());

export const ApiUnionResponse = <TModel extends Type<any> | string>(
  okedType?: OkedType,
  model?: TModel,
  options?: ApiUnionResponseOptions<TModel>,
) => {
  options = Object.assign({}, { okedType, model }, options);

  const decorators = [
    ApiOkedResponse(options),
    ApiUnauthorizedResponse({
      type: ErrResponseSchema,
    }),
    ApiForbiddenResponse({
      type: ErrResponseSchema,
    }),
    ApiInternalServerErrorResponse({
      type: ErrResponseSchema,
    }),
  ].filter(Boolean);

  return applyDecorators(...decorators);
};
