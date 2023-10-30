import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx, MgrMetaTables } from '@indiebase/server-shared';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Knex } from 'knex';
import { CreatePrjDTO } from './projects.dto';
import crypto from 'node:crypto';
import { TmplMigrationSource } from '../../migrations/TmplMigrationSource';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger('MgrProjectsService');

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {}

  /**
   * This function will create an organizational namespace by using schema,
   * enabling data isolation.
   */
  public async create(org: string, prj: CreatePrjDTO) {
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
            projectId: crypto.randomBytes(8).toString('hex'),
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
