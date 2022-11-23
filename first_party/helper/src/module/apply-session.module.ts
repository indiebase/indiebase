/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ClassProvider,
  DynamicModule,
  FactoryProvider,
  Global,
  Inject,
  Module,
  ModuleMetadata,
  NestModule,
  OnModuleDestroy,
  Provider,
  Type,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import FastifySession from '@fastify/session';
import * as ConnectRedis from 'connect-redis';
import { FastifyInstance } from 'fastify';
import { type Redis as IRedis, RedisOptions } from 'ioredis';
import Redis from 'ioredis';
import FastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import fastifyPassport from '@fastify/passport';

const RedisStore = ConnectRedis(FastifySession);
export const REDIS_SESSION_FASTIFY_MODULE = Symbol(
  'REDIS_SESSION_FASTIFY_MODULE',
);

export interface RedisSessionFastifyModuleOptions {
  redis?: RedisOptions;
  session: FastifySession.Options;
  cookie?: FastifyCookieOptions;
}
export interface RedisSessionFastifyModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<RedisSessionFastifyModuleOptionsFactory>;
  useExisting?: Type<RedisSessionFastifyModuleOptionsFactory>;
  useFactory?: (
    ...args: unknown[]
  ) =>
    | Promise<RedisSessionFastifyModuleOptions>
    | RedisSessionFastifyModuleOptions;
  inject?: Array<Type<RedisSessionFastifyModuleOptionsFactory> | string | any>;
}

export interface RedisSessionFastifyModuleOptionsFactory {
  createRedisSessionFastifyModuleOptions():
    | Promise<RedisSessionFastifyModuleOptions>
    | RedisSessionFastifyModuleOptions;
}

@Global()
@Module({})
export class ApplySessionModule implements NestModule, OnModuleDestroy {
  public static forRoot(
    options: RedisSessionFastifyModuleOptions,
  ): DynamicModule {
    return {
      module: ApplySessionModule,
      providers: [
        {
          provide: REDIS_SESSION_FASTIFY_MODULE,
          useValue: options,
        },
      ],
    };
  }

  public static forRootAsync(
    options: RedisSessionFastifyModuleAsyncOptions,
  ): DynamicModule {
    return {
      imports: [...(options.imports || [])],
      module: ApplySessionModule,
      providers: [...createAsyncProviders(options)],
    };
  }

  constructor(
    private readonly adapterHost: HttpAdapterHost,
    @Inject(REDIS_SESSION_FASTIFY_MODULE)
    private readonly options: RedisSessionFastifyModuleOptions,
  ) {}

  public onModuleDestroy(): void {
    const redisStore: any & { client: IRedis } = this.options.session.store;
    redisStore.client.disconnect();
  }

  public async configure() {
    const fastifyInstance =
      this.adapterHost?.httpAdapter?.getInstance() as FastifyInstance;
    if (!fastifyInstance) {
      return;
    }

    this.options.session.store = new RedisStore({
      client: new Redis(this.options.redis),
    });

    if (!this.options.session.cookieName) {
      this.options.session.cookieName = 'SID';
    }

    await fastifyInstance.register(FastifyCookie, this.options?.cookie);
    await fastifyInstance.register(FastifySession, this.options.session);
    await fastifyInstance.register(fastifyPassport.initialize());
    await fastifyInstance.register(fastifyPassport.secureSession());
  }
}

function createAsyncProviders(
  options: RedisSessionFastifyModuleAsyncOptions,
): Provider[] {
  const asyncOptionsProvider = createAsyncOptionsProvider(options);
  if (options.useExisting || options.useFactory) {
    return [asyncOptionsProvider];
  }

  const providers: Provider[] = [asyncOptionsProvider];

  if (options.useClass) {
    providers.push({
      provide: options.useClass,
      useClass: options.useClass,
    } as ClassProvider);
  }

  return providers;
}

function createAsyncOptionsProvider(
  options: RedisSessionFastifyModuleAsyncOptions,
): FactoryProvider {
  if (options.useFactory) {
    return {
      inject: options.inject || [],
      provide: REDIS_SESSION_FASTIFY_MODULE,
      useFactory: options.useFactory,
    };
  }
  return {
    inject: [options.useClass || options.useExisting].filter(
      (x): x is Type<RedisSessionFastifyModuleOptionsFactory> =>
        x !== undefined,
    ),
    provide: REDIS_SESSION_FASTIFY_MODULE,
    useFactory: async (
      optionsFactory: RedisSessionFastifyModuleOptionsFactory,
    ): Promise<RedisSessionFastifyModuleOptions> => {
      return optionsFactory.createRedisSessionFastifyModuleOptions();
    },
  };
}
