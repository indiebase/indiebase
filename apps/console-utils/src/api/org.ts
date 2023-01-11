import { BaseResSchema, IProject } from '@letscollab-nest/trait';
import { req } from './request';

export const projectsQuery = async function (): Promise<
  BaseResSchema<IProject[]>
> {
  const { data } = await req.get('/v1/prj/list');
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

export const createOrgApi = async function (
  body: Record<string, any>,
): Promise<BaseResSchema<Record<string, any>>> {
  const { data } = await req.post('/v1/org', body);
  return data;
};
