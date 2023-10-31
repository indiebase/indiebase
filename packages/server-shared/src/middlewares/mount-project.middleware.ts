import { did } from '@deskbtm/gadgets';
import { InjectKnexEx } from '@indiebase/nest-knex';
import { X_Indiebase_Project_ID } from '@indiebase/sdk';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { type FastifyRequest } from 'fastify';
import { MgrMetaTables } from '../knex/tables';
import { type KnexEx } from '../knex/knex.ex';

@Injectable()
export class MountProjectMiddleware<
  Request extends FastifyRequest,
  Response = any,
> implements NestMiddleware<Request, Response>
{
  constructor(
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {}

  async use(req: Request, _: Response, next: () => void) {
    const prjId = req.headers[X_Indiebase_Project_ID] as string;

    if (prjId) {
      if (prjId === 'mgr') {
        req.project = {
          name: 'mgr',
        } as any;
      } else {
        const [_, prj] = await did(this.knexEx.getProjectByReferenceId(prjId));
        req.project = prj;
      }
    }
    next();
  }
}
