import { applyDecorators } from '@nestjs/common';
import { ErrorResSchema } from '../dto';
import {
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiMethodNotAllowedResponse,
  ApiNotAcceptableResponse,
  ApiRequestTimeoutResponse,
  ApiConflictResponse,
  ApiPreconditionFailedResponse,
  ApiTooManyRequestsResponse,
  ApiGoneResponse,
  ApiPayloadTooLargeResponse,
  ApiUnsupportedMediaTypeResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  ApiNotImplementedResponse,
  ApiBadGatewayResponse,
  ApiServiceUnavailableResponse,
  ApiGatewayTimeoutResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

export function ApiExceptionResponse() {
  return applyDecorators(
    ApiBadRequestResponse({ type: ErrorResSchema }),
    ApiUnauthorizedResponse({ type: ErrorResSchema }),
    ApiNotFoundResponse({ type: ErrorResSchema }),
    ApiForbiddenResponse({ type: ErrorResSchema }),
    ApiMethodNotAllowedResponse({ type: ErrorResSchema }),
    ApiNotAcceptableResponse({ type: ErrorResSchema }),
    ApiRequestTimeoutResponse({ type: ErrorResSchema }),
    ApiConflictResponse({ type: ErrorResSchema }),
    ApiPreconditionFailedResponse({ type: ErrorResSchema }),
    ApiTooManyRequestsResponse({ type: ErrorResSchema }),
    ApiGoneResponse({ type: ErrorResSchema }),
    ApiPayloadTooLargeResponse({ type: ErrorResSchema }),
    ApiUnsupportedMediaTypeResponse({ type: ErrorResSchema }),
    ApiUnprocessableEntityResponse({ type: ErrorResSchema }),
    ApiInternalServerErrorResponse({ type: ErrorResSchema }),
    ApiNotImplementedResponse({ type: ErrorResSchema }),
    ApiBadGatewayResponse({ type: ErrorResSchema }),
    ApiServiceUnavailableResponse({ type: ErrorResSchema }),
    ApiGatewayTimeoutResponse({ type: ErrorResSchema }),
  );
}
