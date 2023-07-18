const webpack = require('webpack');
const path = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions;

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
      modulesDir: path.resolve(__dirname, '../node_modules'),
    }),
  ],
  devtool: 'eval-source-map',
  module: {
    unsafeCache: true,
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: swcDefaultConfig,
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
    new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: true }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  optimization: {
    concatenateModules: true,
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
