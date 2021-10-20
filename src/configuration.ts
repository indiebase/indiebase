import { App, Configuration, Logger } from '@midwayjs/decorator';
import { IMidwayLogger } from '@midwayjs/logger';
import { ILifeCycle } from '@midwayjs/core';
import { join, resolve } from 'path';
import * as jwt from '@deskbtm/midway-jwt';
import * as passport from '@deskbtm/midway-passport';
import * as orm from '@midwayjs/orm';
import { IMidwayExpressApplication } from '@midwayjs/express';
import * as express from 'express';

@Configuration({
  imports: [jwt, passport, orm],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: IMidwayExpressApplication;

  @Logger()
  logger: IMidwayLogger;

  async onReady() {
    const env = this.app.getEnv(),
      dir = this.app.getAppDir(),
      ls = this.app.getMaxListeners();
    const isProduction = env === 'prodcution';

    this.logger.info('ENV:', env);
    this.logger.info('DIR:', dir);
    this.logger.info('MAX_LISTENERS:', ls);

    // this.app.use(bodyParser());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.createLogger('Dashboard', {
      disableFile: !isProduction,
      disableConsole: isProduction,
      defaultLabel: 'dashboard',
      level: 'all',
      dir: resolve(this.app.getAppDir(), 'logs', '1', 'dashboard'),
    });

    this.app.createLogger('Client', {
      disableFile: !isProduction,
      disableConsole: isProduction,
      defaultLabel: 'client',
      level: 'all',
      dir: resolve(this.app.getAppDir(), 'logs', '1', 'client'),
    });
  }
}
