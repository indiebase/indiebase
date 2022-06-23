import { SetMetadata } from '@nestjs/common';
import { ROLES_META } from './casbin.constants';

export const Roles = (...roles: any[]) => SetMetadata(ROLES_META, roles);
