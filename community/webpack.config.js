const webpack = require('webpack');
const path = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions;

const getYarnWorkspaceDeps = function () {
  const pkg = require('./package.json');
  return Object.entries(pkg.dependencies)
    .map((k) => (k[1].includes('workspace') ? new RegExp(k[0]) : null))
    .filter(Boolean);
};

const wsExternals = getYarnWorkspaceDeps();

/**
 * @todo swc-loader doesn't support project references.
 * https://github.com/swc-project/swc/discussions/2156
 *
 * @type {import('webpack').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  target: 'node',
  externals: [
    nodeExternals({
      modulesFromFile: true,
      allowlist: ['webpack/hot/poll?100', /^ky/].concat(wsExternals),
      additionalModuleDirs: [path.resolve(__dirname, '../node_modules')],
    }),
  ],
  externalsPresets: {
    node: true,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /.([jt])sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            ...swcDefaultConfig,
          },
        },
      },
      // {
      //   test: /.([jt])sx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'ts-loader',
      //     options: {
      //       configFile: 'tsconfig.json',
      //       projectReferences: true,
      //       experimentalWatchApi: true,
      //       transpileOnly: true,
      //     },
      //   },
      // },
    ],
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'tsconfig.json',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      name: 'main.js',
      autoRestart: true,
      nodeArgs: ['--trace-warnings'],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  optimization: {
    concatenateModules: true,
  },
  watchOptions: {
    poll: 2000,
    aggregateTimeout: 2000,
    ignored: ['**/dist/**/*.js', '**/node_modules'],
  },
  node: false,
  stats: {
    hash: true,
    timings: false,
    cached: false,
    cachedAssets: false,
    modules: false,
    warnings: true,
    errors: true,
    colors: true,
    chunks: true,
    assets: false,
    chunkOrigins: false,
    chunkModules: false,
    children: false,
    reasons: true,
    version: true,
    errorDetails: true,
    moduleTrace: false,
    usedExports: false,
  },
};
