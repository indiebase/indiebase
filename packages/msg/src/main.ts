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
import * as fs from 'fs';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bodyParser: true,
      logger: ['verbose'],
    },
  );

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const nacosConfigService: NacosConfigService =
    app.get<NacosConfigService>(NacosConfigService);

  const nacosConfigs = await nacosConfigService.getConfig('service-auth.json');

  app.setGlobalPrefix('v1');

  // !isProduction && (await setupApiDoc(app));
  // await setupApiDoc(app);
  // const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);
  // app.useLogger(nestWinston);

  // app.useGlobalFilters(
  //   new FormatExceptionFilter(nestWinston),
  //   // new HttpExceptionFilter(nestWinston.logger),
  // );

  try {
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
    await app.startAllMicroservices().catch((e) => {
      console.log(e);
    });
  } catch (e) {
    console.log(e);
  }

  fs.writeFileSync(
    process.cwd() + '/demo.txt',
    `${process.env.HTTP_HOSTNAME} ${process.env.HTTP_PORT} ${configService.get(
      'app.port',
    )} ${configService.get('app.hostname')}`,
  );

  console.log(
    process.env.HTTP_HOSTNAME,
    process.env.HTTP_PORT,
    configService.get('app.port'),
    configService.get('app.hostname'),
    '========================',
  );

  await app.listen(17001, '0.0.0.0');
}

bootstrap().catch((e) => {
  console.log(e);
});
