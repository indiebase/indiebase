import {
  BaseResSchema,
  Project,
  Org,
  PaginationReqSchema,
} from '@letscollab-nest/trait';
import { req } from './request';

export const fetchMyGithubOrgsApi = async function (): Promise<
  BaseResSchema<Record<string, any>>
> {
  const { data } = await req.get('/v1/org/github');
  return data;
};

export const fetchGithubOrgApi = async function (
  org,
): Promise<BaseResSchema<Record<string, any>>> {
  const { data } = await req.get('/v1/org/github/' + org);
  return data;
};

export const fetchGithubOrgReposApi = async function ({
  queryKey,
}): Promise<BaseResSchema<Record<string, any>>> {
  const { data } = await req.get('/v1/org/github/' + queryKey[1] + '/repos');
  return data;
};

export const createOrgApi = async function (
  body: Record<string, any>,
): Promise<BaseResSchema<Record<string, any>>> {
  const { data } = await req.post('/v1/org', body);
  return data;
};

export const fetchOrgApi = async function ({
  queryKey,
}): Promise<BaseResSchema<Org>> {
  const { data } = await req.get('/v1/org/' + queryKey[1]);
  return data;
};

export const inviteMembersApi = async function (
  body: Record<string, any>,
): Promise<BaseResSchema<Record<string, any>>> {
  const { data } = await req.post('/v1/org', body);
  return data;
};

export const fetchOrgProjectsApi = async function (
  org,
): Promise<BaseResSchema<Project[]>> {
  const { data } = await req.get(`/v1/org/${org}/pinned_projects`);
  return data;
};
