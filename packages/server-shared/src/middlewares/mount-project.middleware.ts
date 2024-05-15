import { IncomingMessage, ServerResponse } from 'node:http';

import { did } from '@deskbtm/gadgets';
import { InjectKnexEx } from '@indiebase/nest-knex';
import { X_Indiebase_Reference_Id } from '@indiebase/sdk';
import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { type KnexEx } from '../knex/knex.ex';
import { indiebaseMgr } from './project-indiebase-mgr';

@Injectable()
export class MountProjectMiddleware<
  Request extends FastifyRequest,
  Response extends ServerResponse,
> implements NestMiddleware<Request, Response>
{
  constructor(
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {}

  async use(req: Request, _: Response, next: (...params: any) => void) {
    const rId =
      (req.headers[X_Indiebase_Reference_Id] as string) ??
      req.query?.['referenceId'];

    if (rId) {
      if (rId === 'indiebase_mgr') {
        req.project = indiebaseMgr;
      } else {
        const [_, prj] = await did(this.knexEx.getProjectByReferenceId(rId));
        req.project = prj;
      }

      if (!req.project) {
        next(new NotFoundException(`Project ${rId} not found`));
      }
    } else {
      next(
        new BadRequestException('Project Reference ID is required in header'),
      );
    }

    next();
  }
}
