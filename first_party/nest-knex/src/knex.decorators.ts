import { Inject } from '@nestjs/common';

import { KnexOptions } from './knex.interfaces';
import { getConnectionToken } from './knex.utils';

export const InjectKnex = (connection?: string | KnexOptions) => {
  return Inject(getConnectionToken(connection));
};

export const InjectKnexEx = (connection?: string | KnexOptions) => {
  return Inject(getConnectionToken(connection, true));
};
