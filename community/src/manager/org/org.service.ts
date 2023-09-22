import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrgService {
  constructor(private readonly logger: Logger) {}

  /**
   * This function will create an organizational namespace by using schema,
   * enabling data isolation.
   */
  public async create(name: string) {
    
  }
}
