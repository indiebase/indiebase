import { SetMetadata } from '@nestjs/common';
import { RoleGuardProps } from './role.interface';

export const Roles = (roles: RoleGuardProps) => SetMetadata('roles', roles);
