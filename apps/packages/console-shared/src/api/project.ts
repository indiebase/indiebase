import { BaseResSchema, PaginationReqSchema, Project } from '@indiebase/trait';
import { req } from './request';
export interface QueryOwnedProjects {
  orgName: string;
  name?: string;
}

export const searchGithubProjectApi = async function (
  params,
): Promise<BaseResSchema> {
  const { data } = await req.get('/v1/project/github/search', {
    params,
  });
  return data;
};

export const createProjectApi = async function (body): Promise<BaseResSchema> {
  const { data } = await req.post('/v1/project', body);
  return data;
};

export const queryOwnedProjectsApi = async function (
  params: PaginationReqSchema<QueryOwnedProjects>,
): Promise<BaseResSchema<Project[]>> {
  const { data } = await req.get('/v1/project/list', {
    params,
  });
  return data;
};
