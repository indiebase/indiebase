import { IncomingMessage, ServerResponse } from 'node:http';

import { did } from '@deskbtm/gadgets';
import { InjectKnexEx } from '@indiebase/nest-knex';
import { X_Indiebase_Project_ID } from '@indiebase/sdk';
import { NestMiddleware } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';

import { type KnexEx } from '../knex/knex.ex';

@Injectable()
export class MountProjectMiddleware<
  Request extends IncomingMessage,
  Response extends ServerResponse,
> implements NestMiddleware<Request, Response>
{
  constructor(
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {}

  async use(req: Request, _: Response, next: (...params: any) => void) {
    const prjId = req.headers[X_Indiebase_Project_ID] as string;

    if (prjId) {
      if (prjId === 'mgr') {
        req.project = {
          name: 'mgr',
          namespace: 'mgr',
        } as any;
      } else {
        const [_, prj] = await did(this.knexEx.getProjectByReferenceId(prjId));
        req.project = prj;
      }

      if (!req.project) {
        next(new NotFoundException(`Project ${prjId} not found`));
      }
    }

    next();
  }
}
