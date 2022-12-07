import path from 'path';

export const is = {
  type(obj: unknown, str: string): boolean {
    return Object.prototype.toString.call(obj) === `[object ${str}]`;
  },
  string(obj: unknown): obj is string {
    return this.type(obj, 'String');
  },
  object(obj: unknown): obj is object {
    return this.type(obj, 'Object');
  },
  function(obj: unknown): obj is Function {
    return this.type(obj, 'Function');
  },
  asyncFunction(obj: unknown): obj is Function {
    return this.type(obj, 'AsyncFunction');
  },
  null(obj: unknown): obj is null {
    return this.type(obj, 'Null');
  },
  undefined(obj: unknown): obj is undefined {
    return this.type(obj, 'Undefined');
  },
  number(obj: unknown): obj is number {
    return this.type(obj, 'Number');
  },
  array(obj: unknown): obj is [] {
    return this.type(obj, 'Array');
  },
};

export const getSubdomain = function (
  domain: string,
  index: number = 2,
  prefix = '.',
) {
  return prefix + domain.split('.').slice(-index).join('.');
};

export const overwriteSwaggerStaticAssets = function (finalPath, app) {
  const httpAdapter = app.getHttpAdapter();
  const swaggerAssetsAbsoluteFSPath = path.resolve(
    __dirname,
    './swagger-ui-dist',
  );
  if (httpAdapter && httpAdapter.getType() === 'fastify') {
    app.useStaticAssets({
      root: swaggerAssetsAbsoluteFSPath,
      prefix: finalPath,
      decorateReply: false,
    });
  } else {
    app.useStaticAssets(swaggerAssetsAbsoluteFSPath, {
      prefix: finalPath,
    });
  }
};
