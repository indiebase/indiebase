import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';
import { PrjStatus } from '../constant';
import { BaseResSchema } from '../interface';
import { req } from './request';
import './org.mock';
export interface IProject {
  id: number;
  name: string;
  contactEmail: string;
  status?: PrjStatus;
  description?: string;
  createTime: Date;
  updateTime: Date;
  members?: any;
  githubRepoUrl?: string;
}

export const projectsQuery = async function (): Promise<
  BaseResSchema<IProject[]>
> {
  const { data } = await req.get('/v1/prj/list');
  return data;
};
