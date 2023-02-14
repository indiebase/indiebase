import path from 'path';

export const getSubdomain = function (
  domain: string,
  index: number = 2,
  prefix = '.',
) {
  return prefix + domain.split('.').slice(-index).join('.');
};

/**
 * Overwrite `swagger-ui-dist` for production to resolve not found.
 *
 * @param finalPath
 * @param app
 */
export const overwriteSwaggerStaticAssets = function (
  finalPath: string,
  app: any,
) {
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

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
