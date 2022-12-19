import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NacosConfigService } from '@letscollab-nest/nacos';
import { HttpExceptionFilter } from '@letscollab-nest/helper';
import {
  i18nValidationErrorFactory,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import fastifyHelmet from '@fastify/helmet';
import Fastify from 'fastify';
import { useContainer } from 'class-validator';

const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const fastify = Fastify();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastify),
    {
      logger: isDevelopment ? ['verbose'] : ['error', 'warn'],
      bodyParser: true,
    },
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const logger = app.get<Logger>(Logger);

  try {
    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const nacosConfigService: NacosConfigService =
      app.get<NacosConfigService>(NacosConfigService);

    const userConfigs = await nacosConfigService.getConfig('service-user.json');

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: isDevelopment,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: i18nValidationErrorFactory,
      }),
    );

    await app.register(fastifyHelmet, {
      global: true,
      crossOriginOpenerPolicy: {
        policy: 'same-origin-allow-popups',
      },
      contentSecurityPolicy: false,
      referrerPolicy: true,
    });

    const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

    app.useLogger(nestWinston);

    app.useGlobalFilters(
      new HttpExceptionFilter(nestWinston),
      new I18nValidationExceptionFilter(),
    );

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: userConfigs.rabbitmq.urls,
        queue: 'collab_queue',
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
  } catch (error) {
    logger.error(error);
  }
}

bootstrap();
