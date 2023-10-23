import '@deskbtm/gadgets/env';
import fastifyHelmet from '@fastify/helmet';
import { HttpExceptionFilter, sizeParser } from '@indiebase/server-shared';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { resolve } from 'path';
import { AppModule } from './app.module';
import FastifyMultipart from '@fastify/multipart';
import { useContainer } from 'class-validator';
import { setupApiDoc } from './swagger.setup';
import fastifyPassport from '@fastify/passport';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
declare const module: any;

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
    const sessionSecret = config.get('app.sessionSecret');

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: kDevMode,
        // validateCustomDecorators: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        // exceptionFactory: i18nValidationErrorFactory,
      }),
    );

    // Inject service to ValidatorConstraintInterface
    useContainer(app.select(AppModule), {
      fallbackOnErrors: true,
    });

    await app.register(fastifyHelmet, {
      global: true,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: kProdMode,
      contentSecurityPolicy: false,
      referrerPolicy: {
        policy: 'origin',
      },
    });

    await app.register(fastifyCookie, {
      secret: sessionSecret,
    });
    await app.register(fastifySession, {
      secret: sessionSecret,
    });
    await app.register(fastifyPassport.initialize());
    await app.register(fastifyPassport.secureSession());

    // Should be front of setupApiDoc.
    app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });

    app.enableCors({
      origin: config.get('app.corsOrigin'),
      credentials: true,
    });

    // Setup swagger api doc with  .
    await setupApiDoc(app);
    await app.register(FastifyMultipart, {
      limits: {
        fileSize: sizeParser(config.get('storage.file.limit')),
      },
    });

    app.useStaticAssets({
      root: resolve(__dirname, '../public'),
    });
    app.useLogger(nestWinston);
    app.useGlobalFilters(new HttpExceptionFilter(nestWinston));

    const port = config.get('app.port'),
      hostname = config.get('app.hostname');

    await app.listen(port, hostname);
    // Logger.log(`🚀 Application is running on: http://${hostname}:${port}`);
  } catch (error) {
    logger.error(error);
  }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(async () => {
      await app.close();
    });
  }
}

bootstrap();
