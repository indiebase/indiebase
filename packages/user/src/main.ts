import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter, USER_QUEUE } from '@letscollab-nest/helper';
import fastifyHelmet from '@fastify/helmet';
import Fastify from 'fastify';
import {
  i18nValidationErrorFactory,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
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

  // Inject service to ValidatorConstraintInterface
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const logger = app.get<Logger>(Logger);

  try {
    const configService = app.get<ConfigService>(ConfigService);

    // //dto international
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

    app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });

    const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

    app.useLogger(nestWinston);
    app.useGlobalFilters(
      new HttpExceptionFilter(nestWinston),
      new I18nValidationExceptionFilter(),
    );

    app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.RMQ,
        options: {
          urls: configService.get('amqp.urls'),
          queue: USER_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
      { inheritAppConfig: true },
    );

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
