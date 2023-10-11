import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
        message: `Organization ⌜${org}⌟ doesn't exist.`,
      });
    }

    return this.knex
      .transaction(async (trx) => {
        await trx
          .withSchema('mgr')
          .insert({
            name: prj.name,
          })
          .into(MgrMetaTables.projects);
        await trx.schema.createSchema(namespace);
        await trx.migrate.up({
          migrationSource: new TmplMigrationSource(namespace),
          tableName: `knex_${namespace}_migration`,
          schemaName: namespace,
        });
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException({
          message: 'An error occurred while creating the project',
        });
      });
  }
}
