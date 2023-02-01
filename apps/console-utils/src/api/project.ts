import { BaseResSchema } from '@letscollab-nest/trait';
import { req } from './request';

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
