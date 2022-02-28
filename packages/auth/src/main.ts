import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const nacosConfigService: NacosConfigService =
    app.get<NacosConfigService>(NacosConfigService);

  const configs = await nacosConfigService.getConfig('service-auth.json');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: configs.app.authMicroservicePort,
      host: configs.app.authMicroserviceHost,
    },
  });
  await app.listen(configs.app.port);
}

bootstrap();
