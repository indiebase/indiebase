import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [Logger],
  exports: [],
})
export class UserModule {}
