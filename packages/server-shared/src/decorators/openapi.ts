import { X_Indiebase_AP, X_Indiebase_Project_ID } from '@indiebase/sdk';
import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  ErrResponseSchema,
  OkResponseSchema,
  PaginationResponseSchema,
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
    name: X_Indiebase_Project_ID,
    description:
      'Indiebase Project ID. e.g. 4b3643f67affc66d. `indiebase` is a specific value for manager API',
    required: true,
    schema: {
      default: 'indiebase',
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
 * Common API headers. Type 1.
 *
 * Includes
 * - ApiSecurity('ap')
 * - ApiProtectionHeader
 * - ApiProjectHeader
 */
export const ApiUnionType1Header = () =>
  applyDecorators(ApiProjectHeader(), ApiIndiebaseSecurity());

export const ApiUnionResponse = (okType?: 'pagination') => {
  let okSchema;
  switch (okType) {
    case 'pagination':
      okSchema = PaginationResponseSchema;
      break;
    default:
      okSchema = OkResponseSchema;
      break;
  }

  return applyDecorators(
    ApiOkResponse({
      type: okSchema,
    }),
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
