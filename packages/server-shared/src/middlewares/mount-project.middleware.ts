import { did } from '@deskbtm/gadgets';
import { InjectKnex } from '@indiebase/nest-knex';
import { X_Indiebase_Project_ID } from '@indiebase/sdk';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { type FastifyRequest } from 'fastify';
import { Knex } from 'knex';
import { MgrMetaTables } from '../knex/tables';

@Injectable()
export class MountProjectMiddleware<
  Request extends FastifyRequest,
  Response = any,
> implements NestMiddleware<Request, Response>
{
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const prjId = req.headers[X_Indiebase_Project_ID];

    if (prjId) {
      const [_, prj] = await did(
        this.knex
          .withSchema('mgr')
          .select('*')
          .from(MgrMetaTables.projects)
          .where('project_id', prjId),
      );

      console.log(prj);
    }
    next();
  }
}
