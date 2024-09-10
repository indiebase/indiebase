import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { INDIEBASE_MGR, KnexEx, TmplTables } from '@indiebase/server-shared';
import { hashSecret, MgrTables } from '@indiebase/server-shared';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Knex } from 'knex';

import { SignUpHackersDTO, UpdateHackersDTO } from './hackers.dto';

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
    await this.knex(MgrTables.orgs).withSchema(INDIEBASE_MGR).insert({
      name: INDIEBASE_MGR,
    });
    return this.knex(`indiebase_mgr.${MgrTables.orgs}`).select();
  }

  public async update(body: UpdateHackersDTO) {
    const { email, contactEmail, description, avatarUrl } = body;

    // try {
    //   await this.knex
    //     .update({ name, contactEmail, description, avatarUrl })
    //     .into(`indiebase_mgr.${MgrTables.orgs}`);
    // } catch (error) {
    //   this.logger.error(error);
    //   throw new InternalServerErrorException();
    // }

    // this.knex.update().updateFrom
    // await this.knex.schema.createSchema(org.name);
    // await this.knex(MgrTables.orgs).withSchema(INDIEBASE_MGR).insert({
    //   name: org.name,
    // });
    // await this.knex.migrate.up({
    //   migrationSource: new MigrationSource('mgr'),
    //   tableName: 'knex_demo_migration',
    //   schemaName: 'mgr',
    // });
  }

  /**
   * This function will create an project namespace by using schema,
   * enabling data isolation.
   */
  public async create(hacker: SignUpHackersDTO) {
    let { email, username, password } = hacker;
    password = await hashSecret(password);
    await this.knex<SignUpHackersDTO>(TmplTables.users)
      .withSchema(INDIEBASE_MGR)
      .insert({
        email,
        username,
        password,
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException();
      });
  }
}
