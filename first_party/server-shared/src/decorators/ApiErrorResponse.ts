import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { ErrorResSchema } from '../dto';

export function ApiErrorResponse() {
  return applyDecorators(
    ApiForbiddenResponse({ type: ErrorResSchema }),
    ApiBadRequestResponse({ type: ErrorResSchema }),
  );
}
