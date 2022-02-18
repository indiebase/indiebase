import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NacosUtils } from '@letscollab/utils';
import { AppModule } from './app.module';
import { NACOS_USER_DATA_ID } from './app.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nacosConfigService: NacosConfigService =
    app.get<NacosConfigService>(NacosConfigService);
  const config = await NacosUtils.getConfig(
    nacosConfigService,
    NACOS_USER_DATA_ID,
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: config.app.userMicroservicePort,
    },
  });
  await app.listen(config.app.httpPort);
}

bootstrap();
