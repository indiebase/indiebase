import { BaseResSchema, IProject } from '@letscollab-nest/trait';
import { req } from './request';

export const projectsQuery = async function (): Promise<
  BaseResSchema<IProject[]>
> {
  const { data } = await req.get('/v1/prj/list');
  return data;
};
