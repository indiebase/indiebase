import {
  ForbiddenException,
  HttpServer,
  INestApplication,
} from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { OpenAPIObject } from '@nestjs/swagger';
import fsPromises from 'fs/promises';
import Handlebars from 'handlebars';
import pathLib from 'path';

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

    const name = this.getAdapterName(httpAdapter);

    switch (name) {
      case 'FastifyAdapter':
        return this.setupFastify(
          path,
          app as NestFastifyApplication,
          document,
          userOptions,
        );
      case 'ExpressAdapter':
        return this.setupExpress(
          path,
          app as NestExpressApplication,
          document,
          userOptions,
        );
      default:
        throw new Error(
          `The ${name} adapter is not supported. Please use FastifyAdapter/ExpressAdapter instead.`,
        );
    }
  }

  private static getAdapterName(httpAdapter: HttpServer) {
    return (
      httpAdapter && httpAdapter.constructor && httpAdapter.constructor.name
    );
  }

  private static startStatic(
    root: string,
    prefix: string,
    app: INestApplication,
  ) {
    const name = this.getAdapterName(app.getHttpAdapter());

    switch (name) {
      case 'FastifyAdapter':
        (app as NestFastifyApplication).useStaticAssets({
          root,
          prefix,
          decorateReply: false,
        });
        break;
      case 'ExpressAdapter':
        (app as NestExpressApplication).useStaticAssets(root, {
          prefix,
        });
        break;
      default:
        throw new Error(
          `The ${name} adapter is not supported. Please use FastifyAdapter/ExpressAdapter instead.`,
        );
    }
  }

  private static getGlobalPrefix(app: any) {
    return app.config?.getGlobalPrefix() ?? '';
  }

  private static prefixSlug(p: string) {
    return p?.[0] !== '/' ? `/${p}` : p;
  }

  private static async presetDocument(
    path: string,
    app: INestApplication,
    document: OpenAPIObject,
    options: StoplightElementsModuleOptions = {},
  ) {
    const formatPath = this.prefixSlug(pathLib.posix.normalize(path)),
      globalPrefix = this.getGlobalPrefix(app);

    const prefixPath = globalPrefix
      ? `${globalPrefix}${formatPath}`
      : formatPath;

    const jsonDocument = JSON.stringify(document);

    options.apiDescriptionDocument = jsonDocument;
    options.basePath = prefixPath;

    const rootPath = options.assetsPath ?? pathLib.join(__dirname, 'views');

    const templatePath = pathLib.join(rootPath, 'stoplight-elements.hbs');
    const content = await readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(content),
      HTML = template(options);
    const httpAdapter = app.getHttpAdapter();

    try {
      httpAdapter.get(prefixPath, (req, res, next) => {
        // Avoid ERR_TOO_MANY_REDIRECTS caused by express path to regexp.
        if (!req.url.endsWith('/')) {
          res.redirect(`${prefixPath}/`);
        } else {
          next?.();
        }
      });

      httpAdapter.get(`${prefixPath}/`, async (req, res) => {
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
    } catch (error) {
      /* empty */
    }

    this.startStatic(rootPath, prefixPath, app);
  }

  public static async setupExpress(
    path: string,
    app: NestExpressApplication,
    document: OpenAPIObject,
    options?: StoplightElementsModuleOptions,
  ) {
    return this.presetDocument(path, app, document, options);
  }

  public static async setupFastify(
    path: string,
    app: NestFastifyApplication,
    document: OpenAPIObject,
    options?: StoplightElementsModuleOptions,
  ) {
    return this.presetDocument(path, app, document, options);
  }
}
