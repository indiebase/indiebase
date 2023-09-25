import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [Logger, UserService],
  exports: [UserService],
})
export class UserModule {}
