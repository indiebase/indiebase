import { Inject } from '@nestjs/common';

import { getS3ConnectionToken } from './docker.utils';

export const InjectS3 = (connection?: string) => {
  return Inject(getS3ConnectionToken(connection));
};
