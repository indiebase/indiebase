const webpack = require('webpack');
const path = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const workspaceTools = require('workspace-tools');
const process = require('node:process');
const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions;

async function getWorkspacesPackageNameRegExps(cwd) {
  const ws = workspaceTools.getWorkspaces(cwd);
  const packageNames = ws.map((p) => p.name);

  return packageNames.map((p) => new RegExp(p));
}

/**
 *
 * @param {Object} options
 * @param {string[]=} options.entry - default ['webpack/hot/poll?100', './src/main.ts']
 * @param {boolean=} options.swc - default true. If true, enable swc otherwise, use tsc.
 * @param {string[]=} options.additionalExternals
 * @param {string} options.mode - default process.env.NODE_ENV || 'development'
 * @param {boolean=} options.bundleWorkspace - default true
 * @param {string=} options.cwd - default process.cwd()
 * @param {boolean|string} options.sourceMap - default true
 * @param {string=} options.tsconfig - default tsconfig.json
 * @param {import('webpack').ResolveOptions} options.resolve
 * @param {Object} options.output
 * @param {Array=} options.additionalPlugins
 * @param {Array=} options.additionalRules
 * @param {Array=} options.externalsAllowList
 * @param {Partial<import('run-script-webpack-plugin').RunScriptWebpackPluginOptions>=} options.startOptions
 * @return {import('webpack').Configuration}
 */
exports.createWebpackConfig = async (options) => {
  const cwd = process.cwd();

  options = Object.assign(
    {},
    {
      entry: ['webpack/hot/poll?100', './src/main.ts'],
      swc: true,
      mode: process.env.NODE_ENV || 'development',
      bundleWorkspace: true,
      cwd,
      tsconfig: 'tsconfig.json',
      resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
      },
      additionalPlugins: [],
      additionalRules: [],
      additionalExternals: [path.resolve(cwd, 'node_modules')],
      externalsAllowList: [],
      output: {
        path: path.resolve(cwd, 'dist'),
        filename: 'main.js',
      },
      startOptions: {
        name: 'main.js',
        autoRestart: true,
        nodeArgs: ['--trace-warnings', '--inspect'],
      },
    },
    options,
  );

  const workspacePkgs = await getWorkspacesPackageNameRegExps(options.cwd);
  /**
   * @type {import('webpack').Rule}
   */
  const rules = [];

  if (options.swc) {
    rules.push({
      test: /.([jt])sx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'swc-loader',
        options: {
          ...swcDefaultConfig,
        },
      },
    });
  } else {
    rules.push({
      test: /.([jt])sx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
          projectReferences: true,
          experimentalWatchApi: true,
          transpileOnly: true,
        },
      },
    });
  }

  return {
    context: options.cwd,
    entry: options.entry,
    target: 'node',
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'].concat(
          options.externalsAllowList,
          options.bundleWorkspace ? workspacePkgs : [],
        ),
        additionalModuleDirs: options.additionalExternals,
      }),
    ],
    externalsPresets: {
      node: true,
    },
    devtool: 'eval-source-map',
    module: {
      rules: [...rules, ...options.additionalRules],
    },
    mode: options.mode,
    resolve: options.resolve,
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: options.tsconfig,
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new RunScriptWebpackPlugin(options.startOptions),
      ...options.additionalPlugins,
    ],
    output: options.output,
    optimization: {
      concatenateModules: true,
    },
    watchOptions: {
      poll: 2000,
      aggregateTimeout: 500,
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
};
