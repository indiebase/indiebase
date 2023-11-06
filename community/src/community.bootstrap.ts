import fastifyCookie from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import fastifyPassport from '@fastify/passport';
import fastifySession from '@fastify/session';
import { HttpExceptionFilter, sizeParser } from '@indiebase/server-shared';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyStaticOptions } from '@nestjs/platform-fastify/interfaces/external';
import { useContainer } from 'class-validator';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { setupApiDoc } from './swagger.setup';

declare const module: any;

interface BootstrapOptions {
  staticAssets?: FastifyStaticOptions;
}

export class CommunityBootstrap {
  public app: NestFastifyApplication;
  public config: ConfigService;

  constructor(private readonly options?: BootstrapOptions) {}

  /**
   * @param EntryModule - Indiebase pro app or community app module class
   * @returns
   */
  async create(EntryModule: any) {
    this.app = await NestFactory.create<NestFastifyApplication>(
      EntryModule,
      new FastifyAdapter(),
      {
        bodyParser: true,
        logger: kDevMode ? ['verbose'] : ['error', 'warn'],
      },
    );

    this.config = this.app.get<ConfigService>(ConfigService);
    const nestWinston = this.app.get(WINSTON_MODULE_NEST_PROVIDER);

    // Inject service to ValidatorConstraintInterface
    useContainer(this.app.select(EntryModule), {
      fallbackOnErrors: true,
    });

    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        enableDebugMessages: kDevMode,
        whitelist: true,
        forbidNonWhitelisted: true,
        // validateCustomDecorators: true,
        // exceptionFactory: i18nValidationErrorFactory,
      }),
    );

    await this.registerPlugins();

    // Should be front of setupApiDoc.
    this.app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });

    this.app.enableCors({
      origin: this.config.get('app.corsOrigin'),
      credentials: true,
    });

    // Setup swagger api doc with  .
    await setupApiDoc(this.app);
    this.app.useStaticAssets(this.options?.staticAssets);
    this.app.useLogger(nestWinston);
    this.app.useGlobalFilters(new HttpExceptionFilter(nestWinston));

    return this;
  }

  private async registerPlugins() {
    const sessionSecret = this.config.get('app.sessionSecret');
    await this.app.register(fastifyHelmet, {
      global: true,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: kProdMode,
      contentSecurityPolicy: false,
      referrerPolicy: {
        policy: 'origin',
      },
    });

    await this.app.register(fastifyCookie, {
      secret: sessionSecret,
    });
    await this.app.register(fastifySession, {
      secret: sessionSecret,
    });
    await this.app.register(fastifyPassport.initialize());
    await this.app.register(fastifyPassport.secureSession());

    fastifyPassport.registerUserSerializer(async (user, request) => {
      console.log(',===', user, request);
      return {};
    });

    await this.app.register(fastifyMultipart, {
      limits: {
        fileSize: sizeParser(this.config.get('storage.file.limit')),
      },
    });
  }

  async start(port?: number, hostname?: string) {
    const p = port ?? this.config.get('app.port');
    const h = hostname ?? this.config.get('app.hostname');

    if (kDevMode && module.hot) {
      module.hot.accept();
      module.hot.dispose(async () => {
        await this.app.close();
      });
    }

    Logger.log(`\n\n\n🚀 Indiebase is running on: http://${h}:${p}\n\n`);

    return this.app.listen(p, h);
  }
}
