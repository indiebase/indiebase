import { join, resolve } from 'path';
import * as jwt from '@deskbtm/midway-jwt';
import { ILifeCycle } from '@midwayjs/core';
import { IMidwayLogger } from '@midwayjs/logger';
import { App, Config, Configuration, Logger } from '@midwayjs/decorator';
import { IMidwayExpressApplication } from '@midwayjs/express';
import * as passport from '@deskbtm/midway-passport';
import * as orm from '@midwayjs/orm';
import * as express from 'express';
import * as swagger from '@midwayjs/swagger';
import * as cors from 'cors';

@Configuration({
  imports: [
    jwt,
    passport,
    orm,
    {
      component: swagger,
      enabledEnvironment: ['development'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: IMidwayExpressApplication;

  @Logger()
  logger: IMidwayLogger;

  @Config('others')
  others: any;

  async onReady() {
    const env = this.app.getEnv(),
      dir = this.app.getAppDir(),
      ls = this.app.getMaxListeners();
    const isProduction = env === 'prodcution';

    this.logger.info('ENV:', env);
    this.logger.info('DIR:', dir);
    this.logger.info('MAX_LISTENERS:', ls);

    // cors
    this.app.use(
      cors({
        origin: this.others.whiteListDomain,
        credentials: true,
        methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
      })
    );

    // bodyparser
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // 设置log
    this.app.createLogger('dash', {
      disableFile: !isProduction,
      disableConsole: isProduction,
      defaultLabel: 'Dashboard',
      level: 'all',
      dir: resolve(this.app.getAppDir(), 'logs', '1', 'dashboard'),
    });

    this.app.createLogger('client', {
      disableFile: !isProduction,
      disableConsole: isProduction,
      defaultLabel: 'Client',
      level: 'all',
      dir: resolve(this.app.getAppDir(), 'logs', '1', 'client'),
    });
  }
}
