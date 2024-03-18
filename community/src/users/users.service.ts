import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import type { KnexEx } from '@indiebase/server-shared';
import { Injectable, Logger } from '@nestjs/common';
import type { Knex } from 'knex';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {}

  public async create() {}
}
