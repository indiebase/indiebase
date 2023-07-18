import { Inject } from '@nestjs/common';
import { KnexOptions } from './knex.interfaces';
import { getConnectionToken } from './knex.utils';

export const InjectModel = (connection?: string) => {
  return Inject(getConnectionToken(connection));
};

export const InjectConnection: (
  connection?: KnexOptions | string,
) => ParameterDecorator = (connection?: KnexOptions | string) =>
  Inject(getConnectionToken(connection));
