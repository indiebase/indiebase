/* eslint-disable @typescript-eslint/no-require-imports */
const {
  swcDefaultsFactory,
} = require('@nestjs/cli/lib/compiler/defaults/swc-defaults');
const rspack = require('@rspack/core');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const workspaceTools = require('workspace-tools');

const swcDefaultConfig = swcDefaultsFactory().swcOptions;

async function getWorkspacesPackageNameRegExps(cwd) {
  const ws = workspaceTools.getWorkspaces(cwd);
  const packageNames = ws.map((p) => p.name);

  // eslint-disable-next-line security/detect-non-literal-regexp
  return packageNames.map((p) => new RegExp(p));
}

/**@import {}*/
const config = async () => {
  const cwd = process.cwd();
  const workspacePkgs = await getWorkspacesPackageNameRegExps(cwd);

  return {
    context: __dirname,
    target: 'node',
    entry: {
      main: ['@rspack/core/hot/poll?100', './src/main.ts'],
    },
    resolve: {
      extensions: ['...', '.ts', '.tsx', '.mjs', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.node$/,
          use: [
            {
              loader: 'node-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /.([jt])sx?$/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              ...swcDefaultConfig,
            },
          },
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: 'tsconfig.json',
        },
      }),
      new RunScriptWebpackPlugin({
        name: 'main.js',
        autoRestart: false,
      }),
      new rspack.HotModuleReplacementPlugin(),
    ],
    externalsPresets: {
      node: true,
    },
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      },
    },
    externalsType: 'commonjs',
    externals: [
      nodeExternals({
        allowlist: [
          '@rspack/core/hot/poll?100',
          /\.(?!(?:jsx?|json)$).{1,5}$/i,
        ].concat(workspacePkgs, [
          /^ky/i,
          /octokit/i,
          /@octokit/i,
          /^universal-user-agent/i,
          /^before-after-hook/i,
          /^universal-github-app-jwt/i,
        ]),
        additionalModuleDirs: [path.resolve(cwd, '../node_modules')],
      }),
    ],
  };
};

module.exports = config;
