import { req } from './request';

export const uploadFile = async (body: Record<string, any>): Promise<any> => {
  const { data } = await req.post('/v1/file/upload', body);
  return data ?? {};
};
