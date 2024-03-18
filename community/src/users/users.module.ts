import { Logger, Module } from '@nestjs/common';

import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [Logger],
  exports: [],
})
export class UsersModule {}
