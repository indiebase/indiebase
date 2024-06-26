import { InjectKnex } from '@indiebase/nest-knex';
import { MgrTables } from '@indiebase/server-shared';
import { type PrimitiveProject } from '@indiebase/trait';
import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class MgrAuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  public getAuthProviders(project: PrimitiveProject) {
    return this.knex
      .withSchema(project.namespace)
      .select('*')
      .from(MgrTables.oauthProviders);
  }
}
