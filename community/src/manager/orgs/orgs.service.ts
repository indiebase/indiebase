import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateOrgDto } from './orgs.dto';
import { Knex } from 'knex';
import { KnexEx } from '@indiebase/server-shared';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { MetaTables } from '~/migrations/tables';

@Injectable()
export class OrgsService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
    private readonly logger: Logger,
  ) {}

  public async createOrg() {
    // await this.knex.schema.createSchema(org.name);
    // await this.knex(MetaTables.orgs).withSchema('mgr').insert({
    //   name: org.name,
    // });
  }

  /**
   * This function will create an organizational namespace by using schema,
   * enabling data isolation.
   */
  public async restCreate(org: CreateOrgDto) {
    await this.knex(MetaTables.orgs).withSchema('mgr').insert({
      name: org.name,
    });
  }
}
