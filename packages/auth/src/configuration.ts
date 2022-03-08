import { Configuration } from '@midwayjs/decorator';
import * as express from '@midwayjs/express';
import * as orm from '@midwayjs/orm';
import { resolve } from 'path';

@Configuration({
  imports: [express],
  importConfigs: [resolve(__dirname, './config')],
  conflictCheck: true,
})
export class AutoConfiguration {}
