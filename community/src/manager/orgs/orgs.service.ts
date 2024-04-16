import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { MgrMetaTables } from '@indiebase/server-shared';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Knex } from 'knex';

import { CreateOrgDTO, UpdateOrgDTO } from './orgs.dto';

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

  public async update(body: UpdateOrgDTO) {
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
   * Deletes an organization by its name.
   * @param name - The name of the organization to delete.
   * @returns The number of rows affected by the deletion.
   */
  public async delete(name: string) {
    return this.knex(MgrMetaTables.orgs)
      .withSchema('mgr')
      .where({
        name,
      })
      .del();
  }

  /**
   * All the APIs about deletion use soft delete by default
   *
   * Deletes an organization by its name.
   * @param name - The name of the organization to delete.
   * @returns The number of rows affected by the deletion.
   */
  public async softDelete(name: string) {
    return this.knex(MgrMetaTables.orgs)
      .withSchema('mgr')
      .where({
        name,
      })
      .del();
  }

  /**
   * This function will create an organizational namespace by using schema,
   * enabling data isolation.
   */
  public async create(org: CreateOrgDTO) {
    return this.knex(MgrMetaTables.orgs).withSchema('mgr').insert({
      name: org.name,
    });
  }
}
