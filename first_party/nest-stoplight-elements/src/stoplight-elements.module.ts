import {
  ForbiddenException,
  HttpServer,
  INestApplication,
} from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { OpenAPIObject } from '@nestjs/swagger';
import Handlebars from 'handlebars';
import * as path from 'path';
import * as fsPromises from 'fs/promises';

const { readFile } = fsPromises;

/**
 * @see {@link https://docs.stoplight.io/docs/elements/b074dc47b2826-elements-configuration-options}
 */
export interface StoplightElementsOptions {
  apiDescriptionDocument?: string;
  apiDescriptionUrl?: string;
  /**
   * Stoplight elements base path.
   */
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
  /**
   * Views root path.
   */
  assetsPath?: string;
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

  private static startStatic(
    root: string,
    prefix: string,
    app: INestApplication,
  ) {
    if (this.isFastify(app.getHttpAdapter())) {
      (app as NestFastifyApplication).useStaticAssets({
        root,
        prefix,
        decorateReply: false,
      });
    }
  }

  private static getGlobalPrefix(app: any) {
    return app.config?.getGlobalPrefix() ?? '';
  }

  private static prefixSlug(p: string) {
    return p?.[0] !== '/' ? `/${p}` : p;
  }

  public static async setupFastify(
    p: string,
    app: NestFastifyApplication,
    document: OpenAPIObject,
    options?: StoplightElementsModuleOptions,
  ) {
    const formatPath = this.prefixSlug(path.posix.normalize(p)),
      globalPrefix = this.getGlobalPrefix(app);

    const finalPath = globalPrefix
      ? `${globalPrefix}${formatPath}`
      : formatPath;

    const jsonDocument = JSON.stringify(document);

    options.apiDescriptionDocument = jsonDocument;
    options.basePath = finalPath;

    const assetsPath = options.assetsPath ?? path.join(__dirname, 'views');

    const templatePath = path.join(assetsPath, 'stoplight-elements.hbs');
    const content = await readFile(templatePath, 'utf-8');
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

    this.startStatic(assetsPath, finalPath, app);
  }
}
