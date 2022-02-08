import { TypeOrmModule } from '@nestjs/typeorm';
// import { RoleEntity } from './entity/role.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleController } from './role.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expire') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
