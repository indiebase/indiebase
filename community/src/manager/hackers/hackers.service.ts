import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { hashSecret, MgrMetaTables } from '@indiebase/server-shared';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Knex } from 'knex';

import { CreateHackersDTO, UpdateHackersDTO } from './hackers.dto';

@Injectable()
export class HackersService {
  private readonly logger = new Logger('HackersService');

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

  public async update(body: UpdateHackersDTO) {
    const { email, contactEmail, description, avatarUrl } = body;

    // try {
    //   await this.knex
    //     .update({ name, contactEmail, description, avatarUrl })
    //     .into(`mgr.${MgrMetaTables.orgs}`);
    // } catch (error) {
    //   this.logger.error(error);
    //   throw new InternalServerErrorException();
    // }

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
  public async create(org: CreateHackersDTO) {
    let { email, password } = org;
    password = await hashSecret(password);
    await this.knex<CreateHackersDTO>(MgrMetaTables.hackers)
      .withSchema('mgr')
      .insert({
        email,
        password,
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException();
      });
  }
}
