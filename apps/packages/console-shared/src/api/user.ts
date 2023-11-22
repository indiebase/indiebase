import { req } from './request';
import type {
  BaseResSchema,
  Org,
  PaginationReqSchema,
  PaginationResSchema,
  Resource,
  Role,
  UserProfile,
} from '@indiebase/trait';

export const fetchUserProfile = async (): Promise<
  BaseResSchema<UserProfile>
> => {
  const { data } = await req.get('/v1/user/profile');
  return data ?? {};
};

export const fetchMyOrgs = async (): Promise<BaseResSchema<Org[]>> => {
  const { data } = await req.get('/v1/user/orgs');
  return data ?? {};
};

export const updateUserProfile = async (
  body: Record<string, any>,
): Promise<BaseResSchema<UserProfile>> => {
  const { data } = await req.put('/v1/user/profile', body);
  return data ?? {};
};

export const searchUsersApi = async (
  body: Partial<UserProfile>,
): Promise<BaseResSchema<UserProfile[]>> => {
  const { data } = await req.get('/v1/user/list', { params: body });
  return data ?? {};
};

export const fetchRolesApi = async (
  params: Partial<PaginationReqSchema<Role>>,
): Promise<PaginationResSchema<Role[]>> => {
  const { data } = await req.get('/v1/user/role/list', {
    params,
  });
  return data;
};

export const fetchResourceApi = async (): Promise<
  PaginationResSchema<Resource[]>
> => {
  const { data } = await req.get('/v1/user/res');
  return data;
};
