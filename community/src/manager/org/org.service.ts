import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrgService {
  constructor(private readonly logger: Logger) {}
}
