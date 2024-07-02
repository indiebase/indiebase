import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class ShortMessageService {
  private readonly logger = new Logger('ShortMessageService');

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {}
}
