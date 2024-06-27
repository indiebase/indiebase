import crypto from 'node:crypto';

import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { INDIEBASE_MGR, KnexEx, legalizeName } from '@indiebase/server-shared';
import { MgrTables } from '@indiebase/server-shared';
import { PrimitiveHacker, PrimitiveProject } from '@indiebase/trait';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';

import { TmplMigrationSource, TmplSeedMigrationSource } from '../../migrations';
import { CreatePrjDTO } from './projects.dto';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger('ProjectsService');

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
          .withSchema(INDIEBASE_MGR)
          .insert({
            ownerId: hacker.id,
            name: prj.name,
            namespace,
            referenceId: crypto.randomBytes(8).toString('hex'),
          })
          .into(MgrTables.projects)
          .returning('id');

        await trx
          .withSchema(INDIEBASE_MGR)
          .insert({
            projectId: result[0]?.id,
            userId: hacker.id,
          })
          .into(MgrTables._usersProjects);

        await trx.schema.createSchema(namespace);
        await trx.migrate.up({
          migrationSource: new TmplMigrationSource(namespace),
          tableName: `__knex_${namespace}_migration`,
          schemaName: namespace,
        });
        await trx.migrate.up({
          migrationSource: new TmplSeedMigrationSource(namespace),
          tableName: `__knex_${namespace}_seed_migration`,
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

  public async delete(referenceId: string, hacker: PrimitiveHacker) {
    const project = await this.knex
      .withSchema(INDIEBASE_MGR)
      .select<PrimitiveProject>('*')
      .from(MgrTables.projects)
      .where('reference_id', referenceId)
      .first();

    if (!project) {
      throw new NotFoundException({
        message: `Not found project ${referenceId}`,
      });
    }
    return this.knex
      .transaction(async (trx) => {
        await trx(MgrTables.projects)
          .withSchema(INDIEBASE_MGR)
          .where({
            id: project.id,
          })
          .del();

        return trx.schema.dropSchema(project.namespace, true);
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException({
          message: 'An error occurred while deleting the project',
        });
      });
  }
}
