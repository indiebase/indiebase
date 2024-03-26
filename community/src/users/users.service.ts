import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';

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
