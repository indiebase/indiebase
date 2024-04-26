import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx, paginationData } from '@indiebase/server-shared';
import { IbMetaTables } from '@indiebase/server-shared';
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
        `${IbMetaTables.orgs}.name`,
        `${IbMetaTables.orgs}.description`,
        `${IbMetaTables.orgs}.contact_email`,
        `${IbMetaTables.orgs}.avatar_url`,
        `${IbMetaTables.orgs}.github_org`,
        `${IbMetaTables.orgs}.homepage`,
        `${IbMetaTables.orgs}.visibility`,
        `${IbMetaTables.orgs}.owner_id`,
        `${IbMetaTables.orgs}.created_at`,
        `${IbMetaTables.orgs}.updated_at`,
      ])
      .from(IbMetaTables.orgs)
      .whereNull(`${IbMetaTables.orgs}.deleted_at`)
      .leftJoin(IbMetaTables.hackersOrgs, function () {
        this.on(
          `${IbMetaTables.hackersOrgs}.hacker_id`,
          '=',
          hacker.id as any,
        ).andOn(
          `${IbMetaTables.orgs}.id`,
          '=',
          `${IbMetaTables.hackersOrgs}.org_id`,
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
        .into(IbMetaTables.orgs);
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
    return this.knex(IbMetaTables.orgs)
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
    return this.knex(IbMetaTables.orgs)
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
          .into(IbMetaTables.orgs)
          .returning('id');

        return trx
          .withSchema('indiebase_mgr')
          .insert({
            orgId: result[0]?.id,
            hackerId: hacker.id,
          })
          .into(IbMetaTables.hackersOrgs);
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'An error occurred while creating the organization',
        );
      });
  }
}
