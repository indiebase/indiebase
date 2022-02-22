import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NacosUtils } from '@letscollab/utils';
import { AppModule } from './app.module';
import { NACOS_USER_DATA_ID } from './app.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 23334,
    },
  });
  await app.listen(23333);
}

bootstrap();
