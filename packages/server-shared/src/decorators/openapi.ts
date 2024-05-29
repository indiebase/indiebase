import { X_Indiebase_AP, X_Indiebase_Reference_Id } from '@indiebase/sdk';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiResponseOptions,
  ApiSecurity,
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
export type ApiUnionResponseOptions = ApiResponseOptions & {
  bodyProperties?: SchemaObject | ReferenceObject | null;
  okedType?: OkedType | null;
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
 * Need a paseto token to Sign in and X-Indiebase-AP to protect API.
 * @returns
 */
export const ApiIndiebaseSecurity = () =>
  // ApiSecurity('ap') provides api protection.
  applyDecorators(ApiSecurity('ap'), ApiProtectionHeader());

/**
 * OpenAPI pagination response.
 * @param model
 * @returns
 */
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  options: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedResponseSchema, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseSchema) },
          {
            properties: {
              body: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
                description: 'Response data list',
              },
            },
          },
        ],
      },
      ...options,
    }),
  );
};

export const ApiOkedResponse = <TModel extends Type<any>>(
  model: TModel,
  options: ApiUnionResponseOptions,
) => {
  let { bodyProperties, okedType } = Object.assign({}, {}, options);

  bodyProperties = Object.assign<
    any,
    SchemaObject | ReferenceObject,
    SchemaObject | ReferenceObject | undefined | null
  >(
    {},
    okedType === 'array'
      ? {
          type: 'array',
          items: {
            $ref: getSchemaPath(model),
          },
          description: 'Response data list',
        }
      : {
          $ref: getSchemaPath(model),
          description: 'Response data',
        },
    bodyProperties,
  );

  return applyDecorators(
    ApiExtraModels(OkedResponseSchema, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(OkedResponseSchema) },
          {
            properties: {
              body: {
                ...bodyProperties,
              },
            },
          },
        ],
      },
      ...options,
    }),
  );
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

class Demo {
  // @ApiProperty({ description: 'demo' })
  // url?: string;
}

export const ApiUnionResponse = <TModel extends Type<any>>(
  okedType?: OkedType,
  model?: TModel,
  options?: ApiUnionResponseOptions,
) => {
  options = Object.assign({}, options, { okedType });
  let ApiModelResponse;
  switch (okedType) {
    case 'paginated':
      ApiModelResponse = ApiPaginatedResponse;
      break;
    case 'created':
      ApiModelResponse = ApiCreatedResponse;
      break;
    default:
      ApiModelResponse = ApiOkedResponse;
      break;
  }

  return applyDecorators(
    ApiModelResponse(model ?? Demo, options),
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
