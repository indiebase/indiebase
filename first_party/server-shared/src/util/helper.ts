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

export const kDevMode = process.env.NODE_ENV === 'development';
export const kTestMode = process.env.NODE_ENV === 'test';
export const kReleaseMode = process.env.NODE_ENV === 'production';

/**
 * 由于安卓package name不支持-,
 *
 * @param name
 * @see {@link https://stackoverflow.com/questions/13753637/android-package-name-using-dashes}
 */
export const compatPackageName = function (name: string) {
  return name.replace('-', '_');
};
