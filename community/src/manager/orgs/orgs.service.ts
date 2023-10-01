import { Injectable, Logger } from '@nestjs/common';
import { CreateOrgDto } from './orgs.dto';

@Injectable()
export class OrgsService {
  constructor(private readonly logger: Logger) {}

  /**
   * This function will create an organizational namespace by using schema,
   * enabling data isolation.
   */
  public async create(org: CreateOrgDto) {}
}
