import { PossessionModule } from './possession/possession.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [RoleModule, UserModule, PossessionModule],
  exports: [RoleModule, UserModule, PossessionModule],
})
export class RbacModule {}
