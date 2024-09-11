import { did } from '@deskbtm/gadgets';
import { AccessService } from '@indiebase/nest-accesscontrol';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { CreateBucketCommand, InjectS3, S3Client } from '@indiebase/nest-s3';
import { INDIEBASE_MGR, KnexEx } from '@indiebase/server-shared';
import { M, T } from '@indiebase/server-shared';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';

@Injectable()
export class PresetService {
  private readonly logger = new Logger('PresetService');

  constructor(
    @InjectS3()
    private readonly s3: S3Client,
    @InjectKnexEx() private readonly knexEx: KnexEx,
    @InjectKnex() private readonly knex: Knex,
    private readonly access: AccessService,
    private readonly config: ConfigService,
  ) {}

  private async setGrants(namespace: string) {
    const table = namespace === INDIEBASE_MGR ? M.grants : T.grants;
    const roles = await this.knex.withSchema(namespace).select('*').from(table);

    if (Array.isArray(roles) && roles.length > 0) {
      this.access.setNamespace(namespace)?.setGrants(roles);
    }
  }

  public async initAcl() {
    this.setGrants(INDIEBASE_MGR);

    const projects = await this.knexEx.listProjects();
    for await (const prj of projects) {
      await this.setGrants(prj.namespace);
    }
  }

  public async createTmpBucket() {
    const createBucketCommand = new CreateBucketCommand({ Bucket: 'tmp' });
    const [err] = await did(this.s3.send(createBucketCommand));

    if (err?.name !== 'BucketAlreadyExists') {
      this.logger.error(err);
    }
  }

  public async intStorage() {
    await this.createTmpBucket();
  }
}
