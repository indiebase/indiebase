import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet';
import { HttpExceptionFilter, kDevMode } from '@letscollab/server-shared';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { resolve } from 'path';
import { useContainer } from 'class-validator';
import fastifyMultipart from '@fastify/multipart';
import { i18nValidationErrorFactory } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: true,
      logger: kDevMode ? ['verbose'] : ['error', 'warn'],
    },
  );

  const logger = app.get(Logger);

  try {
    const config = app.get<ConfigService>(ConfigService);
    const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: kDevMode,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: i18nValidationErrorFactory,
      }),
    );

    // Inject service to ValidatorConstraintInterface
    useContainer(app.select(AppModule), {
      fallbackOnErrors: true,
    });

    await app.register<FastifyHelmetOptions>(fastifyHelmet as any, {
      global: true,
      crossOriginOpenerPolicy: false,
      contentSecurityPolicy: false,
      referrerPolicy: {
        policy: 'origin',
      },
    });

    // Should be front of setupApiDoc
    app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });

    app.enableCors({
      origin: config.get('app.corsOrigin'),
      credentials: true,
    });

    // await setupApiDoc(app);

    app.register(fastifyMultipart as any);

    app.useStaticAssets({
      root: resolve(__dirname, '../public'),
    });

    app.useLogger(nestWinston);
    app.useGlobalFilters(new HttpExceptionFilter(nestWinston));

    await app.listen(config.get('app.port'), config.get('app.hostname'));
  } catch (error) {
    logger.error(error);
  }
}

bootstrap();
