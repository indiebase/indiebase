import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { NacosUtils } from '@letscollab/utils';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NACOS_AUTH_DATA_ID } from './app.constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nacosConfigService: NacosConfigService =
    app.get<NacosConfigService>(NacosConfigService);
  const config = await NacosUtils.getConfig(
    nacosConfigService,
    NACOS_AUTH_DATA_ID,
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: config.app.authMicroservicePort,
    },
  });

  await app.startAllMicroservices();
  await app.listen(config.app.httpPort);
}

bootstrap();
