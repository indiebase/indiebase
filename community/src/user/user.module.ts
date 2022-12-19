import { UserController } from './user.controller';
import { Logger, Module } from '@nestjs/common';
import { RoleController } from './role/role.controller';
import { ResourceController } from './res/resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role/role.entity';
import { UserService } from './user.service';
import { RoleService } from './role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [UserController, RoleController, ResourceController],
  providers: [Logger, UserService, RoleService],
  exports: [UserService],
})
export class UserModule {}
