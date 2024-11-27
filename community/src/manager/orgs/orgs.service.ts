import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import {
  INDIEBASE_MGR,
  KnexEx,
  paginatedData,
  T,
} from '@indiebase/server-shared';
import { M } from '@indiebase/server-shared';
import { type PrimitiveHacker } from '@indiebase/trait';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import knex, { Knex } from 'knex';
import * as n from 'knex-hydration';

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

  /**
   * Lists organizations owned by a specific hacker, supporting pagination.
   */
  public async list(
    hacker: PrimitiveHacker,
    { pageSize, pageIndex }: HackerOwnedOrgsDTO,
  ) {
    const schema = this.knex.withSchema(INDIEBASE_MGR);

    // const result = await schema
    //   .select([
    //     `mo.name`,
    //     `mo.description`,
    //     `mo.contact_email`,
    //     `mo.avatar_url`,
    //     `mo.github_org`,
    //     `mo.homepage`,
    //     `mo.visibility`,
    //     `mo.owner_id`,
    //     `mo.created_at`,
    //     `mo.updated_at`,
    //     `uou.password`,
    //   ])
    //   .fromRaw(
    //     `indiebase_mgr.${M.orgs} mo join (
    //       select *
    //       from indiebase_mgr.${M._usersOrgs} muo
    //         join indiebase_mgr.${T.users} tu on tu.id = ${hacker.id}
    //       where
    //         muo.user_id = ${hacker.id}
    //     ) uou on uou.org_id = mo.id`,
    //   );
    // .select([
    //   `o.name`,
    //   `o.description`,
    //   `o.contact_email`,
    //   `o.avatar_url`,
    //   `o.github_org`,
    //   `o.homepage`,
    //   `o.visibility`,
    //   `o.owner_id`,
    //   `o.created_at`,
    //   `o.updated_at`,
    // ])
    // .select('*')
    // // .fromRaw(
    // //   `indiebase_mgr.${M.orgs} o join (select * from indiebase_mgr.${M._usersOrgs} uo join indiebase_mgr.${T.users} u on u.id = ${hacker.id} where uo.user_id = ${hacker.id}) as uou on uou.org_id = o.id`,
    // // )
    // // .whereNull(`o.deleted_at`);
    // .from(`${M.orgs} o`)
    // .join(
    //   schema
    //     .select('*')
    //     .from(`${M._usersOrgs} uo`)
    //     .join(`${T.users} u`, function () {
    //       this.on('u.id', '=', hacker.id as any);
    //     })
    //     .where('uo.user_id', '=', hacker.id as any)
    //     .as('uou')
    //     .toSQL().sql,
    //   function () {
    //     this.on('uou.org_id', '=', 'o.id');
    //   },
    // );

    // .where('uo.user_id', '=', hacker.id as any)
    // .toSQL().sql;
    console.log(
      schema
        .select('*')
        .from(`indiebase_mgr.__ib_users_orgs uo`)
        .join(`indiebase_mgr.ib_users u`, function () {
          this.on('u.id', '=', hacker.id as any);
        })
        .where('uo.user_id', '=', hacker.id as any)
        .as('uou')
        .toSQL().sql,
    );

    const result = await schema
      // .whereNull(`o.deleted_at`)
      // .from(`${M.orgs} orgs`)
      // .joinRaw(
      //   `(?) as iu on orgs.id = iu.org_id`,
      //   schema
      //     .select('*')
      //     .from(`${M._usersOrgs} usersOrgs`)
      //     .join(`${T.users} users`, function () {
      //       this.on('users.id', '=', hacker.id as any);
      //     })
      //     .where(`usersOrgs.user_id`, '=', hacker.id),
      // );

      // .join(`${M._usersOrgs} uo`, function () {
      //   this.on(`o.id`, '=', 'ww.org_id').onExists(function () {
      //     this.select('*')
      //       .from(`${M._usersOrgs} uo1`)
      //       .join(`${T.users} u`, function () {
      //         this.on('u.id', '=', hacker.id as any);
      //       })
      //       .where('uo1.user_id', '=', hacker.id as any);
      //   });
      // });
      .select('*')
      .from('ib_orgs')
      .join(
        schema
          .select('*')
          .from(`indiebase_mgr.__ib_users_orgs uo`)
          .join(`indiebase_mgr.ib_users u`, function () {
            this.on('u.id', '=', hacker.id as any);
          })
          .where('uo.user_id', '=', hacker.id as any)
          .as('uou'),
        'uou.org_id',
        'o.id',
      );
    // .toSQL().sql;
    // .paginate({
    //   pageSize,
    //   pageIndex,
    // })
    // .catch((err) => {
    //   this.logger.error(err);
    //   throw new InternalServerErrorException();
    // });

    console.log(result);
    // return paginatedData(result);
  }

  public async query(org: string, hacker: PrimitiveHacker) {
    const result = await this.knex
      .withSchema(INDIEBASE_MGR)
      .select([
        `${M.orgs}.name`,
        `${M.orgs}.description`,
        `${M.orgs}.contact_email`,
        `${M.orgs}.avatar_url`,
        `${M.orgs}.github_org`,
        `${M.orgs}.homepage`,
        `${M.orgs}.visibility`,
        `${M.orgs}.owner_id`,
        `${M.orgs}.created_at`,
        `${M.orgs}.updated_at`,
      ])
      .from(M.orgs)
      .where({
        name: org,
      })
      .leftJoin(M._usersOrgs, function () {
        this.on(`${M._usersOrgs}.user_id`, '=', hacker.id as any);
      })
      .catch((err) => {
        this.logger.error(err);
      });
    return result;
  }

  /**
   * Updates an organization's details in the database with the given name
   *
   * @param {string} targetOrgName - The name of the organization to be updated
   * @param {UpdateOrgDTO} body - An object containing the updated information, including the new organization name, contact email, description, and avatar URL
   * @throws {InternalServerErrorException} Throws this exception when an error occurs during the update process
   */
  public async update(targetOrgName: string, body: UpdateOrgDTO) {
    const { name, contactEmail, description, avatarUrl } = body;

    try {
      await this.knex
        .withSchema(INDIEBASE_MGR)
        .where({ name: targetOrgName })
        .update({ name, contactEmail, description, avatarUrl })
        .into(M.orgs);
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
    return this.knex(M.orgs)
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
    return this.knex(M.orgs)
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
          .into(M.orgs)
          .returning('id');

        return trx
          .withSchema(INDIEBASE_MGR)
          .insert({
            orgId: result[0]?.id,
            userId: hacker.id,
          })
          .into(M._usersOrgs);
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'An error occurred while creating the organization',
        );
      });
  }
}
