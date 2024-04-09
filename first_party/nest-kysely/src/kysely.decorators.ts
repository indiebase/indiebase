import { Inject } from '@nestjs/common';

import { KyselyOptions } from './kysely.interfaces';
import { getConnectionToken } from './kysely.utils';

export const InjectKysely = (connection?: string | KyselyOptions) => {
  return Inject(getConnectionToken(connection));
};

export const InjectKyselyEx = (connection?: string | KyselyOptions) => {
  return Inject(getConnectionToken(connection, true));
};
