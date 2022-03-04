import { applyDecorators, SetMetadata } from '@nestjs/common';

export function Auth(...roles: []) {
  return applyDecorators(
    SetMetadata('roles', roles),
    // UseGuards(AuthGuard, RolesGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
