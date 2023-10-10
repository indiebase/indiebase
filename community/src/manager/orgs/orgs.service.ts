import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateOrgDto } from './orgs.dto';
import { Knex } from 'knex';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';

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
    // await this.knex(MgrMetaTables.orgs).withSchema('mgr').insert({
    //   name: org.name,
    // });
    // await this.knex.migrate.up({
    //   migrationSource: new MigrationSource('mgr'),
    //   tableName: 'knex_demo_migration',
    //   schemaName: 'mgr',
    // });
  }

  /**
   * This function will create an organizational namespace by using schema,
   * enabling data isolation.
   */
  public async restCreate(org: CreateOrgDto) {
    await this.knex(MgrMetaTables.orgs).withSchema('mgr').insert({
      name: org.name,
    });
  }
}
