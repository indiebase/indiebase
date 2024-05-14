import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx, paginationData } from '@indiebase/server-shared';
import { MgrMetaTables } from '@indiebase/server-shared';
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
      .withSchema('indiebase_mgr')
      .select([
        `${MgrMetaTables.orgs}.name`,
        `${MgrMetaTables.orgs}.description`,
        `${MgrMetaTables.orgs}.contact_email`,
        `${MgrMetaTables.orgs}.avatar_url`,
        `${MgrMetaTables.orgs}.github_org`,
        `${MgrMetaTables.orgs}.homepage`,
        `${MgrMetaTables.orgs}.visibility`,
        `${MgrMetaTables.orgs}.owner_id`,
        `${MgrMetaTables.orgs}.created_at`,
        `${MgrMetaTables.orgs}.updated_at`,
      ])
      .from(MgrMetaTables.orgs)
      .whereNull(`${MgrMetaTables.orgs}.deleted_at`)
      .leftJoin(MgrMetaTables._hackersOrgs, function () {
        this.on(
          `${MgrMetaTables._hackersOrgs}.hacker_id`,
          '=',
          hacker.id as any,
        ).andOn(
          `${MgrMetaTables.orgs}.id`,
          '=',
          `${MgrMetaTables._hackersOrgs}.org_id`,
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

    return paginationData(result);
  }

  public async update(targetOrgName: string, body: UpdateOrgDTO) {
    const { name, contactEmail, description, avatarUrl } = body;

    try {
      await this.knex
        .withSchema('indiebase_mgr')
        .where({ name: targetOrgName })
        .update({ name, contactEmail, description, avatarUrl })
        .into(MgrMetaTables.orgs);
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
    return this.knex(MgrMetaTables.orgs)
      .withSchema('indiebase_mgr')
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
      .withSchema('indiebase_mgr')
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
          .withSchema('indiebase_mgr')
          .insert({ name: org.name, ownerId: hacker.id })
          .into(MgrMetaTables.orgs)
          .returning('id');

        return trx
          .withSchema('indiebase_mgr')
          .insert({
            orgId: result[0]?.id,
            hackerId: hacker.id,
          })
          .into(MgrMetaTables._hackersOrgs);
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'An error occurred while creating the organization',
        );
      });
  }
}
