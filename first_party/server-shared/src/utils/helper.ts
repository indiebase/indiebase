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
 * @deprecated
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
 * Android package name doesn't support `-`,
 *
 * @param name
 * @see {@link https://stackoverflow.com/questions/13753637/android-package-name-using-dashes}
 */
export const compatPackageName = function (name: string) {
  return name.replace('-', '_');
};

const validAmount = function (n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const parsableUnit = function (u: string) {
  return u.match(/\D*/).pop() === u;
};

const incrementBases: any = {
  2: [
    [['b', 'bit', 'bits'], 1 / 8],
    [['B', 'Byte', 'Bytes', 'bytes'], 1],
    [['Kb'], 128],
    [['k', 'K', 'kb', 'KB', 'KiB', 'Ki', 'ki'], 1024],
    [['Mb'], 131072],
    [['m', 'M', 'mb', 'MB', 'MiB', 'Mi', 'mi'], Math.pow(1024, 2)],
    [['Gb'], 1.342e8],
    [['g', 'G', 'gb', 'GB', 'GiB', 'Gi', 'gi'], Math.pow(1024, 3)],
    [['Tb'], 1.374e11],
    [['t', 'T', 'tb', 'TB', 'TiB', 'Ti', 'ti'], Math.pow(1024, 4)],
    [['Pb'], 1.407e14],
    [['p', 'P', 'pb', 'PB', 'PiB', 'Pi', 'pi'], Math.pow(1024, 5)],
    [['Eb'], 1.441e17],
    [['e', 'E', 'eb', 'EB', 'EiB', 'Ei', 'ei'], Math.pow(1024, 6)],
  ],
  10: [
    [['b', 'bit', 'bits'], 1 / 8],
    [['B', 'Byte', 'Bytes', 'bytes'], 1],
    [['Kb'], 125],
    [['k', 'K', 'kb', 'KB', 'KiB', 'Ki', 'ki'], 1000],
    [['Mb'], 125000],
    [['m', 'M', 'mb', 'MB', 'MiB', 'Mi', 'mi'], 1.0e6],
    [['Gb'], 1.25e8],
    [['g', 'G', 'gb', 'GB', 'GiB', 'Gi', 'gi'], 1.0e9],
    [['Tb'], 1.25e11],
    [['t', 'T', 'tb', 'TB', 'TiB', 'Ti', 'ti'], 1.0e12],
    [['Pb'], 1.25e14],
    [['p', 'P', 'pb', 'PB', 'PiB', 'Pi', 'pi'], 1.0e15],
    [['Eb'], 1.25e17],
    [['e', 'E', 'eb', 'EB', 'EiB', 'Ei', 'ei'], 1.0e18],
  ],
};

export const sizeParser = function (
  input: string,
  options: { base: number } = { base: 10 },
) {
  var parsed = input.toString().match(/^([0-9\.,]*)(?:\s*)?(.*)$/);
  var amount: any = parsed[1].replace(',', '.');
  var unit = parsed[2];

  var validUnit = function (sourceUnit: any) {
    return sourceUnit === unit;
  };

  if (!validAmount(amount) || !parsableUnit(unit)) {
    throw "Can't interpret " + (input || 'a blank string');
  }
  if (unit === '') return Math.round(Number(amount));

  var increments = incrementBases[options?.base];
  for (var i = 0; i < increments.length; i++) {
    var _increment = increments[i];

    if (_increment[0].some(validUnit)) {
      return Math.round(amount * _increment[1]);
    }
  }

  throw unit + " doesn't appear to be a valid unit";
};
