import { DemoModule } from './../packages/user/src/demo.module';
import { SiteModule } from '@/website';
import { RbacModule } from '@/rbac';
import { Endpoint } from 'aws-sdk';

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { resolve } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'typeorm';
import configure from '@/config';
import { S3Module, ObsModule } from '@/modules';

@Module({
  imports: [
    DemoModule,
    ObsModule,
    SiteModule,
    RbacModule,
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: {
          accessKeyId: config.get('s3.accessKey'),
          secretAccessKey: config.get('s3.secretKey'),
          endpoint: new Endpoint(config.get('s3.endpoint')),
          signatureVersion: 'v2',
          s3ForcePathStyle: true,
          ssldisabled: true,
        },
      }),
    }),
    // ShareRolesModule.forRoot(MemoryRoles.create()),
  ],
})
export class AppModule implements NestModule {
  // @Inject(ROLES_TOKEN)
  // roles: MemoryRoles;

  // async initRoles(connection: Connection) {
  //   const roleRepo = connection.getRepository(RoleEntity);
  //   const r = await roleRepo.find({ name: DefaultRoles.SITE_OWNER });
  //   if (is.array(r) && r.length === 0) {
  //     await roleRepo.save(_PresetRolesDetail).catch((err) => {
  //
  //       console.error(err)
  //     });
  //   }

  //   const rs = await roleRepo.find({ relations: ['possessions'] });

  //   this.roles.set(rs);
  // }
  async presetSqlFunctions(connection: Connection) {
    // await connection.query(`DROP FUNCTION IF EXISTS \`GET_CHILD_NODE\`;`);
    // await connection.query(POSSESSION_GET_CHILD_NODE);
  }

  constructor(private connection: Connection) {
    this.presetSqlFunctions(connection).catch((err) => {
      console.error(err);
    });
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RateLimitMiddleware).forRoutes({
    //   path: '/',
    //   method: RequestMethod.ALL,
    // });
  }
}
