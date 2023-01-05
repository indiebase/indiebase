import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { setupApiDoc } from './utils';
import { AppModule } from './app.module';
import fastifyHelmet from '@fastify/helmet';
import { HttpExceptionFilter } from '@letscollab-nest/helper';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { resolve } from 'path';
import { useContainer } from 'class-validator';

declare module 'fastify' {
  interface PassportUser {
    [key: string]: any;
  }
}

const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: true,
      logger: isDevelopment ? ['verbose'] : ['error', 'warn'],
    },
  );

  const logger = app.get(Logger);

  try {
    const configService = app.get<ConfigService>(ConfigService);
    const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: isDevelopment,
        whitelist: true,
        forbidNonWhitelisted: true,
        // exceptionFactory: i18nValidationErrorFactory,
      }),
    );

    // Inject service to ValidatorConstraintInterface
    useContainer(app.get(AppModule), { fallbackOnErrors: true });

    await app.register(fastifyHelmet, {
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
      origin: configService.get('app.corsOrigin'),
      credentials: true,
    });

    await setupApiDoc(app);

    app.useStaticAssets({
      root: resolve(__dirname, '../public'),
    });
    app.useLogger(nestWinston);
    app.useGlobalFilters(new HttpExceptionFilter(nestWinston));

    await app.listen(
      configService.get('app.port'),
      configService.get('app.hostname'),
    );
  } catch (error) {
    logger.error(error);
  }
}

bootstrap();
