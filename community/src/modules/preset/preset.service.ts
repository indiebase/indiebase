import { AccessService } from '@indiebase/nest-ac';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx, TmplMetaTables } from '@indiebase/server-shared';
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
    const roles = await this.knex
      .withSchema(namespace)
      .select('*')
      .from(TmplMetaTables.roles);
    this.ac.setNamespace(namespace).setGrants(roles);
  }

  public async initAcl() {
    this.setGrants('mgr');

    const projects = await this.knexEx.listProjects();
    for await (const prj of projects) {
      await this.setGrants(prj.namespace);
    }
  }
}
