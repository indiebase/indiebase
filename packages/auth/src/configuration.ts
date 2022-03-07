import { Configuration } from '@midwayjs/decorator';
import * as express from '@midwayjs/express';

@Configuration({
  imports: [express],
  conflictCheck: true,
})
export class AutoConfiguration {}
