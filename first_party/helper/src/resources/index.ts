export * from './group';
export * from './interface';
export * from './role.res';
export * from './user.res';
import { RoleResource } from './role.res';
import { UserResource } from './user.res';

export type CombineResource = RoleResource | UserResource;
