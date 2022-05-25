import { SetMetadata } from '@nestjs/common';
import { CASBIN_ROLES } from './casbin.constants';

export const Roles = (...roles: any[]) => SetMetadata(CASBIN_ROLES, roles);
