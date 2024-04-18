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

  // SELECT users.username
  // FROM users
  // JOIN user_organization ON users.id = user_organization.user_id
  // JOIN organizations ON user_organization.org_id = organizations.id
  // WHERE organizations.org_name = 'ABC';
  public async list(
    hacker: PrimitiveHacker,
    { pageSize, pageIndex }: HackerOwnedOrgsDTO,
  ) {
    const result = await this.knex
      .withSchema('mgr')
      .select('*')
      .from(MgrMetaTables.orgs)
      .leftJoin(MgrMetaTables.hackersOrgs, function () {
        this.on(
          `${MgrMetaTables.hackersOrgs}.hacker_id`,
          '=',
          hacker.id as any,
        ).andOn(
          `${MgrMetaTables.orgs}.id`,
          '=',
          `${MgrMetaTables.hackersOrgs}.org_id`,
        );
      })
      .paginate({
        pageSize,
        pageIndex,
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return paginationData(result);
  }

  public async update(targetOrgName: string, body: UpdateOrgDTO) {
    const { name, contactEmail, description, avatarUrl } = body;

    try {
      await this.knex
        .withSchema('mgr')
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
      .withSchema('mgr')
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
      .withSchema('mgr')
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
          .withSchema('mgr')
          .insert({ name: org.name, ownerId: hacker.id })
          .into(MgrMetaTables.orgs)
          .returning('id');

        return trx
          .withSchema('mgr')
          .insert({
            orgId: result[0]?.id,
            hackerId: hacker.id,
          })
          .into(MgrMetaTables.hackersOrgs);
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'An error occurred while creating the organization',
        );
      });
  }
}
