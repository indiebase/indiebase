import { BaseResSchema, IProject, Org } from '@letscollab-nest/trait';
import { req } from './request';

export const projectsQuery = async function (): Promise<
  BaseResSchema<IProject[]>
> {
  const { data } = await req.get('/v1/project/list');
  return data;
};

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

export const fetchGithubOrgReposApi = async function (
  org,
): Promise<BaseResSchema<Record<string, any>>> {
  const { data } = await req.get('/v1/org/github/' + org + '/repos');
  return data;
};

export const searchGithubOrgProjectApi = async function (
  org,
): Promise<BaseResSchema<Record<string, any>>> {
  const { data } = await req.get('/v1/org/github/search' + org);
  return data;
};

export const createOrgApi = async function (
  body: Record<string, any>,
): Promise<BaseResSchema<Record<string, any>>> {
  const { data } = await req.post('/v1/org', body);
  return data;
};

export const getOrgApi = async function ({
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
