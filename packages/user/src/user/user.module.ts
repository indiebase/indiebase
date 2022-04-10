import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
    // ClientsModule.registerAsync([
    //   {
    //     name: AUTH_SERVICE_NAME,
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     // async useFactory(nacosConfigService: NacosConfigService) {},
    //   },
    // ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
