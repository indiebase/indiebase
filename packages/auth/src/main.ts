import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { NacosUtils } from '@letscollab/utils';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NACOS_AUTH_DATA_ID } from './app.constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 23332,
    },
  });

  await app.startAllMicroservices();
  await app.listen(23331);
}

bootstrap();
