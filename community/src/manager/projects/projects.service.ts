import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { CreatePrjDto } from './projects.dto';
import { TmplMigrationSource } from '~/migrations/TmplMigrationSource';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
    private readonly logger: Logger,
  ) {}

  /**
   * This function will create an organizational namespace by using schema,
   * enabling data isolation.
   */
  public async create(org: string, prj: CreatePrjDto) {
    const namespace = org + '_' + prj.name;

    if (!(await this.knexEx.hasOrg(org))) {
      //T
      throw new BadRequestException({
        message: `Organization ⌜${org}⌟ does't exist.`,
      });
    }

    this.knex.withSchema('mgr').select('');

    await this.knex(MgrMetaTables.projects).withSchema('mgr').insert({
      name: prj.name,
    });
    await this.knex.schema.createSchema(namespace);
    await this.knex.migrate.up({
      migrationSource: new TmplMigrationSource(namespace),
      tableName: `${namespace}_migration`,
      schemaName: namespace,
    });
  }
}
