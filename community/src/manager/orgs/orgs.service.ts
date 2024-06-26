import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { INDIEBASE_MGR, KnexEx, paginatedData } from '@indiebase/server-shared';
import { MgrTables } from '@indiebase/server-shared';
import { PrimitiveHacker } from '@indiebase/trait';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Knex } from 'knex';

import { CreateOrgDTO, HackerOwnedOrgsDTO, UpdateOrgDTO } from './orgs.dto';

@Injectable()
export class OrgsService {
  private readonly logger = new Logger('OrgsService');

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {}

  public async list(
    hacker: PrimitiveHacker,
    { pageSize, pageIndex }: HackerOwnedOrgsDTO,
  ) {
    const result = await this.knex
      .withSchema(INDIEBASE_MGR)
      .select([
        `${MgrTables.orgs}.name`,
        `${MgrTables.orgs}.description`,
        `${MgrTables.orgs}.contact_email`,
        `${MgrTables.orgs}.avatar_url`,
        `${MgrTables.orgs}.github_org`,
        `${MgrTables.orgs}.homepage`,
        `${MgrTables.orgs}.visibility`,
        `${MgrTables.orgs}.owner_id`,
        `${MgrTables.orgs}.created_at`,
        `${MgrTables.orgs}.updated_at`,
      ])
      .from(MgrTables.orgs)
      .whereNull(`${MgrTables.orgs}.deleted_at`)
      .leftJoin(MgrTables._usersOrgs, function () {
        this.on(`${MgrTables._usersOrgs}.user_id`, '=', hacker.id as any).andOn(
          `${MgrTables.orgs}.id`,
          '=',
          `${MgrTables._usersOrgs}.org_id`,
        );
      })
      .paginate({
        pageSize,
        pageIndex,
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException();
      });

    return paginatedData(result);
  }

  public async update(targetOrgName: string, body: UpdateOrgDTO) {
    const { name, contactEmail, description, avatarUrl } = body;

    try {
      await this.knex
        .withSchema(INDIEBASE_MGR)
        .where({ name: targetOrgName })
        .update({ name, contactEmail, description, avatarUrl })
        .into(MgrTables.orgs);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Deletes an organization by its name.
   * @param name - The name of the organization to delete.
   * @returns The number of rows affected by the deletion.
   */
  public async delete(name: string) {
    return this.knex(MgrTables.orgs)
      .withSchema(INDIEBASE_MGR)
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
    return this.knex(MgrTables.orgs)
      .withSchema(INDIEBASE_MGR)
      .update('deleted_at', this.knex.fn.now())
      .where({
        name,
      });
  }

  /**
   * This function will create an organizational namespace by using schema,
   * enabling data isolation.
   */
  public async create(hacker: PrimitiveHacker, org: CreateOrgDTO) {
    return this.knex
      .transaction(async (trx) => {
        const result = await trx
          .withSchema(INDIEBASE_MGR)
          .insert({ name: org.name, ownerId: hacker.id })
          .into(MgrTables.orgs)
          .returning('id');

        return trx
          .withSchema(INDIEBASE_MGR)
          .insert({
            orgId: result[0]?.id,
            userId: hacker.id,
          })
          .into(MgrTables._usersOrgs);
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'An error occurred while creating the organization',
        );
      });
  }
}
