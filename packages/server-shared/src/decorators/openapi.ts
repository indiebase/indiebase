import { X_Indiebase_AP, X_Indiebase_Reference_Id } from '@indiebase/sdk';
import { applyDecorators, Type } from '@nestjs/common';
import {
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
  ErrResponseSchema,
  OkedResponseSchema,
  PaginatedResponseSchema,
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
      default: 'indiebase_mgr',
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
    }),
  );
};

export const ApiOkedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(OkedResponseSchema, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(OkedResponseSchema) },
          {
            properties: {
              body: {
                description: 'Response data',
                oneOf: [
                  // {
                  //   type: 'object',
                  // },
                  // {
                  //   type: 'string',
                  // },
                  // {
                  //   type: 'number',
                  // },
                ],
              },
            },
          },
        ],
      },
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

export interface ApiUnionResponseOptions {
  okType?: 'paginated' | 'created' | 'oked' | null;
  dataSchema?: Type;
}

class Demo {
  // @ApiProperty({ description: 'demo' })
  // url?: string;
}

export const ApiUnionResponse = <TModel extends Type<any>>(
  okType?: 'paginated' | 'created' | 'oked' | null,
  model?: TModel,
  options?: ApiResponseOptions,
) => {
  let ApiModelResponse;
  switch (okType) {
    case 'paginated':
      ApiModelResponse = ApiPaginatedResponse;
      break;
    default:
      ApiModelResponse = ApiOkedResponse;
      break;
  }

  return applyDecorators(
    ApiModelResponse(model ?? Demo, options),
    // ApiOkResponse({
    //   type: okSchema,
    // }),
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
