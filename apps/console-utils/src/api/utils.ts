import { BaseResSchema } from '@letscollab-nest/trait';
import { req } from './request';

export const uploadFile = async (body: any): Promise<BaseResSchema<any>> => {
  console.log(body);
  const { data } = await req.put('/v1/file/upload', body);
  return data ?? {};
};
