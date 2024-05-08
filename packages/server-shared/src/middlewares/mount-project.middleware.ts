import { IncomingMessage, ServerResponse } from 'node:http';

import { did } from '@deskbtm/gadgets';
import { InjectKnexEx } from '@indiebase/nest-knex';
import { X_Indiebase_Reference_Id } from '@indiebase/sdk';
import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';

import { type KnexEx } from '../knex/knex.ex';
import { indiebaseMgr } from './project-indiebase-mgr';

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
    const prjUID = req.headers[X_Indiebase_Reference_Id] as string;

    if (prjUID) {
      if (prjUID === 'indiebase_mgr') {
        req.project = indiebaseMgr;
      } else {
        const [_, prj] = await did(this.knexEx.getProjectByReferenceId(prjUID));
        req.project = prj;
      }

      if (!req.project) {
        next(new NotFoundException(`Project ${prjUID} not found`));
      }
    } else {
      next(new BadRequestException('Project ID is required in header'));
    }

    next();
  }
}
