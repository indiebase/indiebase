import { AccessService } from '@indiebase/nest-ac';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import {
  KnexEx,
  MgrMetaTables,
  TmplMetaTables,
} from '@indiebase/server-shared';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PresetService {
  constructor(
    @InjectKnexEx() private readonly knexEx: KnexEx,
    @InjectKnex() private readonly knex: Knex,
    private readonly ac: AccessService,
  ) {}

  private async setGrants(namespace: string) {
    const table =
      namespace === 'mgr' ? MgrMetaTables.roles : TmplMetaTables.roles;
    const roles = await this.knex.withSchema(namespace).select('*').from(table);

    if (Array.isArray(roles) && roles.length > 0) {
      this.ac.setNamespace(namespace).setGrants(roles);
    }
  }

  public async initAcl() {
    this.setGrants('mgr');

    const projects = await this.knexEx.listProjects();
    for await (const prj of projects) {
      await this.setGrants(prj.namespace);
    }
  }
}