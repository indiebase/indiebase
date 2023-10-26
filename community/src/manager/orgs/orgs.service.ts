import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateOrgDto, UpdateOrgDto } from './orgs.dto';
import { Knex } from 'knex';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';

@Injectable()
export class OrgsService {
  private readonly logger = new Logger('OrgsService');

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {}

  public async list() {
    await this.knex(MgrMetaTables.orgs).withSchema('mgr').insert({
      name: 'indiebase',
    });
    return this.knex(`mgr.${MgrMetaTables.orgs}`).select();
  }

  public async update(body: UpdateOrgDto) {
    const { name, contactEmail, description, avatarUrl } = body;

    try {
      await this.knex
        .update({ name, contactEmail, description, avatarUrl })
        .into(`mgr.${MgrMetaTables.orgs}`);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }

    // this.knex.update().updateFrom
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
  public async create(org: CreateOrgDto) {
    await this.knex(MgrMetaTables.orgs).withSchema('mgr').insert({
      name: org.name,
    });
  }
}
