import { req } from '../req';

interface FetchRoleParams {
  name?: string;
  [k: string]: any;
}

export interface RoleFormData {
  id?: number;

  name: string;

  disable?: number;

  createTime?: Date;

  updateTime?: Date;

  [k: string]: any;
}

export const queryRolesReq = async function (params?: FetchRoleParams) {
  const { data } = await req.get('/v1/role/query', { data: params });
  return data;
};

export const createRoleReq = async function (params: RoleFormData) {
  const { data } = await req.post('/v1/role/create', params);
  return data;
};

export const updateRoleReq = async function (params: RoleFormData) {
  const { data } = await req.put('/v1/role/update', params);
  return data;
};

export const deleteRoleReq = async function (params: FetchRoleParams) {
  const { data } = await req.delete('/v1/role/delete', { data: params });
  return data;
};
