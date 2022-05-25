import { NacosConfigService } from '@letscollab/nest-nacos';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FormatExceptionFilter } from '@letscollab/helper';
import { setupApiDoc } from './utils';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

const isProduction = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: true,
      logger: isProduction ? ['error', 'warn'] : ['verbose'],
    },
  );

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const nacosConfigService: NacosConfigService =
    app.get<NacosConfigService>(NacosConfigService);

  const nacosConfigs = await nacosConfigService.getConfig('service-auth.json');

  app.setGlobalPrefix('v1');

  await setupApiDoc(app);

  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(nestWinston);

  app.useGlobalFilters(new FormatExceptionFilter(nestWinston));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: nacosConfigs.rabbitmq.urls,
      queue: 'msg_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(
    configService.get('app.port'),
    configService.get('app.hostname'),
  );
}

bootstrap();
