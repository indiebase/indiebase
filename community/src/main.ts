import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet';
import {
  HttpExceptionFilter,
  kDevMode,
  kReleaseMode,
} from '@indiebase/server-shared';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { resolve } from 'path';
import { useContainer } from 'class-validator';
import FastifyMultipart from '@fastify/multipart';
import { i18nValidationErrorFactory } from 'nestjs-i18n';
import fastifyPassport from '@fastify/passport';
import FastifySession from '@fastify/session';
import FastifyCookie from '@fastify/cookie';
import { setupApiDoc } from './swagger.setup';
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
      crossOriginResourcePolicy: kReleaseMode,
      contentSecurityPolicy: false,
      referrerPolicy: {
        policy: 'origin',
      },
    });

    await app.register(FastifyCookie as any, {
      secret: 'UVISaKja95xQLQaGoOBiL9mH2Pm9ZgvgdyutRf9tigo=',
    });

    await app.register(FastifySession as any, {
      secret: 'UVISaKja95xQLQaGoOBiL9mH2Pm9ZgvgdyutRf9tigo=',
    });

    await app.register(fastifyPassport.initialize() as any);
    await app.register(fastifyPassport.secureSession() as any);

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
    await app.register(FastifyMultipart as any, {
      // limits: {
      //   fileSize: sizeParser(config.get('storage.file.limit')),
      // },
    });

    app.useStaticAssets({
      root: resolve(__dirname, '../public'),
    });
    app.useLogger(nestWinston);
    app.useGlobalFilters(new HttpExceptionFilter(nestWinston));

    const port = config.get('app.port'),
      hostname = config.get('app.hostname');

    await app.listen(port, hostname);
    Logger.log(`🚀 Application is running on: http://${hostname}:${port}`);
  } catch (error) {
    logger.error(error);
  }

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(async () => {
  //     await app.close();
  //   });
  // }
}

bootstrap();
