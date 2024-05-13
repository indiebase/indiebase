import crypto from 'node:crypto';

import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx, legalizeName } from '@indiebase/server-shared';
import { MgrMetaTables } from '@indiebase/server-shared';
import { PrimitiveHacker } from '@indiebase/trait';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { Knex } from 'knex';

import { TmplMigrationSource } from '../../migrations/TmplMigrationSource';
import { CreatePrjDTO } from './projects.dto';

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
  public async create(hacker: PrimitiveHacker, org: string, prj: CreatePrjDTO) {
    const namespace = legalizeName(org + '_' + prj.name);

    if (!(await this.knexEx.hasOrg(org))) {
      //T
      throw new NotAcceptableException({
        message: `Organization ⌜${org}⌟ doesn't exist.`,
      });
    }

    return this.knex
      .transaction(async (trx) => {
        const result = await trx
          .withSchema('indiebase_mgr')
          .insert({
            ownerId: hacker.id,
            name: prj.name,
            namespace,
            referenceId: crypto.randomBytes(8).toString('hex'),
          })
          .into(MgrMetaTables.projects)
          .returning('id');

        trx
          .withSchema('indiebase_mgr')
          .insert({
            projectId: result[0]?.id,
            hackerId: hacker.id,
          })
          .into(MgrMetaTables.hackersProjects);

        await trx.schema.createSchema(namespace);
        await trx.migrate.up({
          migrationSource: new TmplMigrationSource(namespace),
          tableName: `__knex_${namespace}_migration`,
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
