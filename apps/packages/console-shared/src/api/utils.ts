import { BaseResSchema } from '@indiebase/trait';
import { req } from './request';

/**
 *
 * @param body
 * @param bucket S3 bucket
 * @returns
 */
export const uploadFile = async (
  body: any,
  bucket: string = 'indiebase-community',
): Promise<BaseResSchema<any>> => {
  const { data } = await req.put('/v1/file/upload/' + bucket, body);
  return data ?? {};
};
