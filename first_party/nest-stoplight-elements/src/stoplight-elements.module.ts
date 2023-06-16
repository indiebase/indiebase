import {
  ForbiddenException,
  HttpServer,
  INestApplication,
} from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { OpenAPIObject } from '@nestjs/swagger';
import Handlebars from 'handlebars';
import { posix, resolve } from 'path';
import * as fsPromises from 'fs/promises';

/**
 * @see {@link https://docs.stoplight.io/docs/elements/b074dc47b2826-elements-configuration-options}
 */
export interface StoplightElementsOptions {
  apiDescriptionDocument?: string;
  apiDescriptionUrl?: string;
  basePath?: string;
  hideInternal?: boolean;
  hideTryIt?: boolean;
  hideSchemas?: boolean;
  hideExport?: boolean;
  tryItCorsProxy?: string;
  tryItCredentialPolicy?: string;
  layout?: 'sidebar' | 'stacked';
  logo?: string;
  router?: 'hash' | 'memory';
}

export interface StoplightElementsModuleOptions
  extends StoplightElementsOptions {
  stoplightJSUrl?: string;
  stoplightCSSUrl?: string;
  favicon?: string;
  auth?: (req: any) => boolean;
}

const defaultOptions = { router: 'hash' };

/**
 *
 * @example
 * ```
 * StoplightElementsModule.setup('/docs',app, xxxDoc, {
 *    logo: 'icon.png'
 * })
 *
 * ```
 */
export class StoplightElementsModule {
  public static async setup(
    path: string,
    app: INestApplication,
    document: OpenAPIObject,
    options?: StoplightElementsModuleOptions,
  ) {
    const httpAdapter = app.getHttpAdapter();
    const userOptions = Object.assign({}, defaultOptions, options);

    if (this.isFastify(httpAdapter)) {
      return this.setupFastify(
        path,
        app as NestFastifyApplication,
        document,
        userOptions,
      );
    }
  }

  private static isFastify(httpAdapter: HttpServer) {
    return (
      httpAdapter &&
      httpAdapter.constructor &&
      httpAdapter.constructor.name === 'FastifyAdapter'
    );
  }

  private static startStatic(path: string, app: INestApplication) {
    if (this.isFastify(app.getHttpAdapter())) {
      (app as NestFastifyApplication).useStaticAssets({
        root: resolve(__dirname, '../views'),
        prefix: path,
        decorateReply: false,
      });
    }
  }

  private static getGlobalPrefix(app: any) {
    return app.config?.getGlobalPrefix() ?? '';
  }

  private static prefixSlug(path: string) {
    return path?.[0] !== '/' ? `/${path}` : path;
  }

  public static async setupFastify(
    path: string,
    app: NestFastifyApplication,
    document: OpenAPIObject,
    options?: StoplightElementsModuleOptions,
  ) {
    const formatPath = this.prefixSlug(posix.normalize(path)),
      globalPrefix = this.getGlobalPrefix(app);

    const finalPath = globalPrefix
      ? `${globalPrefix}${formatPath}`
      : formatPath;

    const jsonDocument = JSON.stringify(document);

    options.apiDescriptionDocument = jsonDocument;
    options.basePath = finalPath;

    const templatePath = resolve(__dirname, '../views/stoplight-elements.hbs');
    const content = await fsPromises.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(content),
      HTML = template(options);
    const httpAdapter = app.getHttpAdapter();

    httpAdapter.get(finalPath, (_req, res) => {
      res.redirect(`${finalPath}/`);
    });

    try {
      httpAdapter.get(`${finalPath}/`, async (req, res) => {
        if (options.auth && !(await options.auth(req))) {
          throw new ForbiddenException();
        }

        res.header(
          'Content-Security-Policy',
          "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; child-src * 'unsafe-inline' 'unsafe-eval' blob:; worker-src * 'unsafe-inline' 'unsafe-eval' blob:; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
        );
        res.type('text/html');
        res.send(HTML);
      });
    } catch (error) {}

    this.startStatic(finalPath, app);
  }
}
