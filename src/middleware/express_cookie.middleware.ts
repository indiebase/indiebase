import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class ExpressCookieMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {
    this.config = config;
  }

  use(req: Request, res: Response, next: NextFunction) {
    cookieParser(this.config.get('cookie.secret'), {})(req, res, next);
  }
}
